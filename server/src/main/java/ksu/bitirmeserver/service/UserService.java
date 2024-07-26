package ksu.bitirmeserver.service;

import ksu.bitirmeserver.dtos.request.CreateUserRequest;
import ksu.bitirmeserver.dtos.request.UpdateUserRequest;
import ksu.bitirmeserver.dtos.response.GetByIdUserResponse;
import ksu.bitirmeserver.dtos.response.UserListResponse;
import ksu.bitirmeserver.exception.UserAlreadyExistsException;
import ksu.bitirmeserver.model.User;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;

import java.util.List;

public interface UserService {
    Result register(User user) throws UserAlreadyExistsException;
    DataResult<List<UserListResponse>> getAll();
    void delete(String email);
    DataResult<GetByIdUserResponse> getById(Long userId);
    Result update(Long id, UpdateUserRequest updateUserRequest);
    User getUser(String email);
    User findByUserId(Long userId);
}
