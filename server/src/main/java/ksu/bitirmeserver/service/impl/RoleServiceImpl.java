package ksu.bitirmeserver.service.impl;

import ksu.bitirmeserver.dtos.response.RoleListResponse;
import ksu.bitirmeserver.exception.RoleAlreadyExistExeption;
import ksu.bitirmeserver.exception.UserAlreadyExistsException;
import ksu.bitirmeserver.model.Role;
import ksu.bitirmeserver.model.User;
import ksu.bitirmeserver.repository.RoleRepository;
import ksu.bitirmeserver.repository.UserRepository;
import ksu.bitirmeserver.service.RoleService;
import ksu.bitirmeserver.service.UserService;
import ksu.bitirmeserver.utilities.mappers.ModelMapperService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.SuccessDataResult;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final ModelMapperService mapperService;

    @Override
    public DataResult<List<RoleListResponse>> getAll() {
        List<Role> roles = roleRepository.findAll();
        List<RoleListResponse> listResponses = roles.stream().map(
                (role) -> mapperService.forResponse().map(role, RoleListResponse.class)).toList();
        return new SuccessDataResult<>(listResponses);
    }

    @Override
    public Role create(Role theRole) {
        String roleName = "ROLE_" + theRole.getName().toUpperCase();
        Role role = new Role(roleName);
        if(roleRepository.existsByName(role)){
            throw new RoleAlreadyExistExeption(theRole.getName() + " role already exists.");
        }
        return roleRepository.save(role);
    }

    @Override
    public void delete(Long id) {
        this.removeAllUsersFromRole(id);
        roleRepository.deleteById(id);
    }

    @Override
    public Role findByName(String name) {

        return roleRepository.findByName(name).get();
    }

    @Override
    public String findRoleNameByUserId(Long userId) {
        return "";
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if(role.isPresent() && user.get().getRoles().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());

            return user.get();
        }
        throw new UsernameNotFoundException("User not found..");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if(user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new UserAlreadyExistsException(
                    user.get().getFirstName() + " is already assined to the" + role.get().getName() + "role");
        }
        if(role.isPresent()){
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }
        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        role.get().removeAllUsersFromRole();

        return roleRepository.save(role.get());
    }
}
