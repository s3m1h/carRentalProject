package ksu.bitirmeserver.service;

import ksu.bitirmeserver.dtos.response.RoleListResponse;
import ksu.bitirmeserver.dtos.response.UserListResponse;
import ksu.bitirmeserver.model.Role;
import ksu.bitirmeserver.model.User;
import ksu.bitirmeserver.utilities.results.DataResult;

import java.util.List;

public interface RoleService {

    DataResult<List<RoleListResponse>> getAll();
    Role create(Role role);
    void delete(Long id);
    Role findByName(String name);
    String findRoleNameByUserId(Long userId);
    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);
}
