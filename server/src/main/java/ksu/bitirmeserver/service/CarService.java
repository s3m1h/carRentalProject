package ksu.bitirmeserver.service;

import ksu.bitirmeserver.dtos.request.CarSearchCriteria;
import ksu.bitirmeserver.dtos.request.CreateCarRequest;
import ksu.bitirmeserver.dtos.request.UpdateCarRequest;
import ksu.bitirmeserver.dtos.response.CarListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdCarResponse;
import ksu.bitirmeserver.model.Car;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface CarService {

    Result add(CreateCarRequest createCarRequest,MultipartFile file) throws IOException, SQLException;
    DataResult<List<CarListResponse>> getAll() throws SQLException;
    Result update(Long id, UpdateCarRequest updateCarRequest, byte[] photoBytes);
    byte[] getCarPhotoByCarId(Long carId) throws SQLException;
    DataResult<GetByIdCarResponse> getById(Long id) throws SQLException;
    void delete(Long id);
    DataResult<List<Car>> searchCars(CarSearchCriteria criteria);
    DataResult<CarListResponse> getCarByBrandAndModel(String brand, String model) throws SQLException ;
    void updateKilometer(Long carId, int kilometer);
    Car findByCarId(Long carId);
    void checkIsExistsByCarId(Long carId);
}
