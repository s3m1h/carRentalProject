package ksu.bitirmeserver.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarListResponse {
    private Long carId;
    private String carName;
    private int modelYear;
    private String carBodyType;
    private String fuelType;
    private String transmissionType;
    private BigDecimal dailyPrice;
    private String description;
    private int kilometer;
    private String photo;
    private String colorName;
    private String brandName;

}
