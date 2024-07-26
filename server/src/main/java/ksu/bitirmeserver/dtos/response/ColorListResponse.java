package ksu.bitirmeserver.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorListResponse {
    private Long id;
    private String colorName;
    private String colorHex;
}
