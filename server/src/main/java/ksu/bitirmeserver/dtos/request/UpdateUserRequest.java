package ksu.bitirmeserver.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String roleName;
}
