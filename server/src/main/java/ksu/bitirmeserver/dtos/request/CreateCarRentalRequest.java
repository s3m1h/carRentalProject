package ksu.bitirmeserver.dtos.request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCarRentalRequest {
    private Long carId;
    private Long userId;
    private LocalDate startDate;
    private LocalDate finishDate;
    private String rentedCity;
    private String deliveredCity;
    private String customerEmail;
    private String customerFullName;

}
