package ksu.bitirmeserver.controller;

import ksu.bitirmeserver.dtos.request.CarSearchCriteria;
import ksu.bitirmeserver.dtos.request.CreateCarRequest;
import ksu.bitirmeserver.dtos.request.UpdateCarRequest;
import ksu.bitirmeserver.dtos.response.CarListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdCarResponse;
import ksu.bitirmeserver.model.Car;
import ksu.bitirmeserver.service.CarService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;


@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Result addCar(
            @RequestPart("carRequest") CreateCarRequest carRequest,
            @RequestPart(name = "files") MultipartFile files) throws SQLException, IOException {
        Result result = carService.add(carRequest,files);
        if(result.isSuccess()) return result;
        return null;
    }

    @GetMapping
    public DataResult<List<CarListResponse>> getAllCars() throws SQLException {
        DataResult<List<CarListResponse>> result = carService.getAll();
        if(result.isSuccess()) return result;
        return null;
    }
    @PutMapping(value = "/{carID}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Result updateCar(@PathVariable("carID") Long id,
                            @RequestPart("carRequest")UpdateCarRequest updateCarRequest,
                            @RequestPart("file") MultipartFile file) throws IOException, SQLException {
        byte[] photoBytes = (file != null && !file.isEmpty()) ? file.getBytes() : carService.getCarPhotoByCarId(id);
        Result result = carService.update(id,updateCarRequest,photoBytes);
        if(result.isSuccess()) return result;
        return null;
    }
    @GetMapping("/{carID}")
    public DataResult<GetByIdCarResponse> getCarById(@PathVariable("carID") Long id) throws SQLException {
        DataResult<GetByIdCarResponse> result = carService.getById(id);
        if(result.isSuccess()) return result;
        return null;
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId){
        carService.delete(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PostMapping("/search")
    public DataResult<List<Car>> searchCars(@RequestBody CarSearchCriteria criteria) {
        DataResult<List<Car>> result = carService.searchCars(criteria);
        if(result.isSuccess()) return result;
        return null;
    }

    @GetMapping("/{brand}/{model}")
    public DataResult<CarListResponse> getCarDetails(@PathVariable String brand, @PathVariable String model) throws SQLException {
        DataResult<CarListResponse> result = carService.getCarByBrandAndModel(brand, model);
        if(result.isSuccess()) return result;
        return null;
    }
}
