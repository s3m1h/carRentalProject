package ksu.bitirmeserver.dtos.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiveTheCarRequest {
    @NotNull
    @Min(1)
    private Long rentalCarId;

    @NotNull
    @Min(1)
    private Long carId;

    @NotNull
    @Min(1)
    private int deliveredKilometer;
}
