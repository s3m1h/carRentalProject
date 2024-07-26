package ksu.bitirmeserver.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityListResponse {
    private Long id;
    private String cityName;
}
