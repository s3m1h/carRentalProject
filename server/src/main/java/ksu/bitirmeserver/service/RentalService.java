package ksu.bitirmeserver.service;

import ksu.bitirmeserver.dtos.request.CarSearchCriteria;
import ksu.bitirmeserver.dtos.request.CreateCarRentalRequest;
import ksu.bitirmeserver.dtos.request.ReceiveTheCarRequest;
import ksu.bitirmeserver.dtos.response.GetByIdRentalResponse;
import ksu.bitirmeserver.dtos.response.CarRentalListResponse;
import ksu.bitirmeserver.model.Car;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;

import java.util.List;

public interface RentalService {
    Result add(CreateCarRentalRequest rentalCarRequest);
    Result receiveTheCar(ReceiveTheCarRequest receiveTheCarRequest);
    Result deleteRental(Long rentalId);
    DataResult<GetByIdRentalResponse> getById(Long id);
    DataResult<List<CarRentalListResponse>> getAllByRental_CarId(Long carId);
    DataResult<List<CarRentalListResponse>> getAll();
    void checkIsExistsByRentalCarId(Long id);
    DataResult<List<CarRentalListResponse>> getRentalsByUserEmail(String email);
}
