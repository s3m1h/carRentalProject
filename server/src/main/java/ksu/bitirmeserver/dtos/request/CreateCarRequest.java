package ksu.bitirmeserver.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCarRequest {

    private String carName;
    private int modelYear;
    private String carBodyType;
    private String fuelType;
    private String transmissionType;
    private BigDecimal dailyPrice;
    private String description;
    private int kilometer;
    private Long colorId;
    private Long brandId;

}
