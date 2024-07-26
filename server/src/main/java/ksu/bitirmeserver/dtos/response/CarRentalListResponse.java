package ksu.bitirmeserver.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarRentalListResponse {
    private Long rentalId;
    private Long carId;
    private String carName;
    private String carBrand;
    private LocalDate startDate;
    private LocalDate finishDate;
    private BigDecimal totalPrice;
    private String confirmationCode;
    private String rentedCity;
    private String deliveredCity;
    private String userFullName;
}
