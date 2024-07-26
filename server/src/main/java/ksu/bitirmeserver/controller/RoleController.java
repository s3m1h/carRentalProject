package ksu.bitirmeserver.controller;

import jakarta.validation.Valid;
import ksu.bitirmeserver.dtos.response.RoleListResponse;
import ksu.bitirmeserver.exception.RoleAlreadyExistExeption;
import ksu.bitirmeserver.model.Role;
import ksu.bitirmeserver.model.User;
import ksu.bitirmeserver.service.RoleService;
import ksu.bitirmeserver.utilities.results.DataResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService roleService;

    @GetMapping

    public DataResult<List<RoleListResponse>> getAllRoles() {
        DataResult<List<RoleListResponse>> result = roleService.getAll();
        if(result.isSuccess()) {
            return result;
        }
        return null;
    }
    @PostMapping
    public ResponseEntity<String> createRole(@RequestBody @Valid Role role) {
        try {
            roleService.create(role);
            return ResponseEntity.ok("Role created successfully");
        }catch (RoleAlreadyExistExeption e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    @DeleteMapping("/{roleId}")
    public void deleteRole(@PathVariable("roleId") Long roleId){
        roleService.delete(roleId);
    }
    @PostMapping("/remove-all-users-from-role/{roleId}")
    public Role removeAllUsersFromRole(@PathVariable("roleId") Long roleId){
        return roleService.removeAllUsersFromRole(roleId);
    }

    @PostMapping("/remove-user-from-role")
    public User removeUserFromRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId){
        return roleService.removeUserFromRole(userId, roleId);
    }
    @PostMapping("/assign-user-to-role")
    public User assignUserToRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId){
        return roleService.assignRoleToUser(userId, roleId);
    }

    @GetMapping("{userId}")
    public String findRoleNameByUserID(@PathVariable Long userId){
        return roleService.findRoleNameByUserId(userId);
    }
}
