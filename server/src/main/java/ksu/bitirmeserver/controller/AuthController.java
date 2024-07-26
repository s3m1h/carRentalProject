package ksu.bitirmeserver.controller;

import jakarta.validation.Valid;
import ksu.bitirmeserver.dtos.request.LoginRequest;
import ksu.bitirmeserver.dtos.response.JwtResponse;
import ksu.bitirmeserver.exception.UserAlreadyExistsException;
import ksu.bitirmeserver.model.Role;
import ksu.bitirmeserver.model.User;
import ksu.bitirmeserver.security.jwt.JwtUtils;
import ksu.bitirmeserver.security.user.CarRentalUserDetails;
import ksu.bitirmeserver.security.user.CarRentalUserDetailsService;
import ksu.bitirmeserver.service.UserService;
import ksu.bitirmeserver.utilities.results.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")

public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid User user) {
        try {
            Result result = userService.register(user);
            if(result.isSuccess()){
                return ResponseEntity.ok("Registration successfully");
            }
            return null;
        }
        catch (UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> authUser(@RequestBody @Valid LoginRequest request){
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        CarRentalUserDetails carRentalUserDetails = (CarRentalUserDetails) authentication.getPrincipal();
        List<String> roles = carRentalUserDetails
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();
        return ResponseEntity.ok(new JwtResponse(
                carRentalUserDetails.getId(),
                carRentalUserDetails.getEmail(),
                jwt,
                roles
        ));
    }

}
