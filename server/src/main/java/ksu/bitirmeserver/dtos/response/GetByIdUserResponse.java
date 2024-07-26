package ksu.bitirmeserver.dtos.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdUserResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String roleName;
}
