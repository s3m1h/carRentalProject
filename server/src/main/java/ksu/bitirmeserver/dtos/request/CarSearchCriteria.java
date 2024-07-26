package ksu.bitirmeserver.dtos.request;

import ksu.bitirmeserver.model.car.CarBodyType;
import ksu.bitirmeserver.model.car.FuelType;
import ksu.bitirmeserver.model.car.TransmissionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarSearchCriteria {
    private String pickupCity;
    private String dropOffCity;
    private LocalDate pickupDate;
    private LocalDate dropOffDate;
    private CarBodyType carBodyType;
    private FuelType fuelType;
    private TransmissionType transmissionType;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
