package ksu.bitirmeserver.controller;

import ksu.bitirmeserver.dtos.request.UpdateUserRequest;
import ksu.bitirmeserver.dtos.response.GetByIdUserResponse;
import ksu.bitirmeserver.dtos.response.UserListResponse;
import ksu.bitirmeserver.model.User;
import ksu.bitirmeserver.service.UserService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @GetMapping
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public DataResult<List<UserListResponse>> getUsers(){
        DataResult<List<UserListResponse>> result = userService.getAll();
        if(result.isSuccess()){
            return result;
        }
        return null;
    }

    @GetMapping("/{email}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email){
        try {
            User user = userService.getUser(email);
            return ResponseEntity.ok(user);
        }
        catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user");
        }
    }
    @DeleteMapping("/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #email == principal.username)")
    public ResponseEntity<String> deleteUser(@PathVariable("email") String email){
        try {
            userService.delete(email);
            return ResponseEntity.ok("User deleted successfully");
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting user");
        }
    }
    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Result updateUser(@PathVariable Long userId, @RequestBody UpdateUserRequest updateUserRequest) {
        Result result = userService.update(userId, updateUserRequest);
        if (result.isSuccess()) {
            return result;
        }
        return null;
    }
    @GetMapping("/getById/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public DataResult<GetByIdUserResponse> getById(@PathVariable Long userId){
        DataResult<GetByIdUserResponse> result = userService.getById(userId);
        if (result.isSuccess()) {
            return result;
        }
        return null;
    }
}
