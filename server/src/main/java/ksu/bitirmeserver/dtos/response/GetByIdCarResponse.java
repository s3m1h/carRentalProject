package ksu.bitirmeserver.dtos.response;

import ksu.bitirmeserver.model.Brand;
import ksu.bitirmeserver.model.Color;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdCarResponse {
    private String carName;
    private int modelYear;
    private String carBodyType;
    private String fuelType;
    private BigDecimal dailyPrice;
    private String description;
    private int kilometer;
    private String photo;
    private String colorName;
    private String brandName;

}
