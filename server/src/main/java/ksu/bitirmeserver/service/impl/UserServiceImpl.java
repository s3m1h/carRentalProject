package ksu.bitirmeserver.service.impl;

import jakarta.transaction.Transactional;
import ksu.bitirmeserver.dtos.request.CreateUserRequest;
import ksu.bitirmeserver.dtos.request.UpdateUserRequest;
import ksu.bitirmeserver.dtos.response.GetByIdUserResponse;
import ksu.bitirmeserver.dtos.response.UserListResponse;
import ksu.bitirmeserver.exception.UserAlreadyExistsException;
import ksu.bitirmeserver.model.Role;
import ksu.bitirmeserver.model.User;
import ksu.bitirmeserver.repository.RoleRepository;
import ksu.bitirmeserver.repository.UserRepository;
import ksu.bitirmeserver.service.UserService;
import ksu.bitirmeserver.utilities.mappers.ModelMapperService;
import ksu.bitirmeserver.utilities.results.*;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final ModelMapperService mapperService;

    @Override
    public Result register(User user) throws UserAlreadyExistsException {
        if(userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() +" already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        userRepository.save(user);
        return new SuccessResult();
    }

    @Override
    public DataResult<List<UserListResponse>> getAll() {
        List<User> users = userRepository.findAll();
        List<UserListResponse> listResponses = users.stream()
                .map(this::mapUserToUserListResponse)
                .collect(Collectors.toList());
        return new SuccessDataResult<>(listResponses);
    }

    private UserListResponse mapUserToUserListResponse(User user) {
        UserListResponse listResponse = mapperService.forResponse().map(user, UserListResponse.class);
        // Benzersiz rol isimlerini al
        List<String> roleNames = roleRepository.findRoleNamesByUserId(user.getId());
        String roleName = roleNames.isEmpty() ? "No Role" : String.join(", ", roleNames);
        listResponse.setRoleName(roleName);
        return listResponse;
    }


    @Transactional
    @Override
    public void delete(String email) {
        User theUser = getUser(email);
        if(theUser != null){
            userRepository.deleteByEmail(email);
        }
    }

    @Override
    public DataResult<GetByIdUserResponse> getById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            return new ErrorDataResult<>("User not found!");
        }

        // Benzersiz rol isimlerini al
        List<String> roleNames = roleRepository.findRoleNamesByUserId(userId);
        String roleName = roleNames.isEmpty() ? "No Role bro" : String.join(", ", roleNames);

        // User nesnesini DTO'ya dönüştür
        GetByIdUserResponse response = mapperService.forResponse().map(user.get(), GetByIdUserResponse.class);
        response.setRoleName(roleName);

        return new SuccessDataResult<>(response);
    }


    @Override
    public Result update(Long id, UpdateUserRequest updateUserRequest) {
        // Kullanıcıyı veritabanından al
        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            return new ErrorResults("User not found!");
        }

        User user = userOptional.get();
        mapperService.forRequest().map(updateUserRequest, user);

        String newPassword = updateUserRequest.getPassword();
        if (newPassword != null && !newPassword.isEmpty() && !passwordEncoder.matches(newPassword, user.getPassword())) {
            String hashedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(hashedPassword);
        }

        // Rol güncelleme işlemi
        String roleName = updateUserRequest.getRoleName();
        if (roleName != null && !roleName.isEmpty()) {
            Optional<Role> roleOptional = roleRepository.findByName(roleName);
            if (roleOptional.isPresent()) {
                Role role = roleOptional.get();
                // Mevcut rolleri kontrol et
                boolean roleExists = user.getRoles().stream()
                        .anyMatch(existingRole -> existingRole.getName().equals(roleName));
                if (!roleExists) {
                    user.getRoles().clear(); // Mevcut rolleri temizle
                    user.getRoles().add(role); // Yeni rol ekle
                }
            }
        }

        // Kullanıcıyı güncelle
        userRepository.save(user);

        return new SuccessResult("User updated successfully");
    }


    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("user bulunamadı.."));
    }

    @Override
    public User findByUserId(Long userId) {
        return userRepository.findById(userId).get();
    }


}
