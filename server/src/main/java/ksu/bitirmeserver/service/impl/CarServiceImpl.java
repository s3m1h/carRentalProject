package ksu.bitirmeserver.service.impl;

import ksu.bitirmeserver.constants.Messages;
import ksu.bitirmeserver.dtos.request.CarSearchCriteria;
import ksu.bitirmeserver.dtos.request.CreateCarRequest;
import ksu.bitirmeserver.dtos.request.UpdateCarRequest;
import ksu.bitirmeserver.dtos.response.CarListResponse;
import ksu.bitirmeserver.dtos.response.GetByIdCarResponse;
import ksu.bitirmeserver.exception.*;
import ksu.bitirmeserver.model.*;
import ksu.bitirmeserver.model.car.CarBodyType;
import ksu.bitirmeserver.model.car.FuelType;
import ksu.bitirmeserver.model.car.TransmissionType;
import ksu.bitirmeserver.repository.BrandRepository;
import ksu.bitirmeserver.repository.CarRepository;
import ksu.bitirmeserver.repository.ColorRepository;
import ksu.bitirmeserver.service.BrandService;
import ksu.bitirmeserver.service.CarService;
import ksu.bitirmeserver.service.ColorService;
import ksu.bitirmeserver.utilities.BlobUtil;
import ksu.bitirmeserver.utilities.StringToEnum;
import ksu.bitirmeserver.utilities.mappers.ModelMapperService;
import ksu.bitirmeserver.utilities.results.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {
    private final ModelMapperService mapperService;

    private final CarRepository carRepository;
    private final BrandService brandService;
    private final ColorService colorService;

    @Override
    public Result add(CreateCarRequest createCarRequest,MultipartFile file) throws IOException, SQLException {
        // brand ve color için var mı yokmu kontrolü yapılması gerek
        Car car = this.mapperService.forRequest().map(createCarRequest, Car.class);
        CarBodyType bodyType = StringToEnum.fromString(CarBodyType.class, createCarRequest.getCarBodyType());
        FuelType fuelType = StringToEnum.fromString(FuelType.class, createCarRequest.getFuelType());
        TransmissionType transmissionType = StringToEnum.fromString(TransmissionType.class, createCarRequest.getTransmissionType());
        car.setCarBodyType(bodyType);
        car.setFuelType(fuelType);
        car.setTransmissionType(transmissionType);
        Blob photoBlob = BlobUtil.photoToBlob(file);
        car.setPhoto(photoBlob);

        carRepository.save(car);
        return new SuccessResult();
    }

    @Override
    public DataResult<List<CarListResponse>> getAll() throws SQLException {
        List<Car> cars = carRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        List<CarListResponse> carListResponses = new ArrayList<>();
        for(Car car: cars){
            byte[] photoBytes = getCarPhotoByCarId(car.getId());
            String base64Photo = BlobUtil.base64BlobToString(photoBytes);
            CarListResponse carListResponse = getCarListResponse(car);
            carListResponse.setPhoto(base64Photo);
            carListResponses.add(carListResponse);
        }
        return new SuccessDataResult<>(carListResponses);
    }

    @Override
    public Result update(Long id, UpdateCarRequest updateCarRequest, byte[] photoBytes) {
        Car car = carRepository.findById(id).get();

        if(updateCarRequest != null){
            car.setName(updateCarRequest.getCarName());
            car.setModelYear(updateCarRequest.getModelYear());
            car.setDailyPrice(updateCarRequest.getDailyPrice());
            car.setDescription(updateCarRequest.getDescription());
            car.setKilometer(updateCarRequest.getKilometer());
            car.setCarBodyType(updateCarRequest.getCarBodyType());
            car.setFuelType(updateCarRequest.getFuelType());
            car.setTransmissionType(updateCarRequest.getTransmissionType());
            car.setBrand(brandService.findByBrandName(updateCarRequest.getBrandName()));
            car.setColor(colorService.findByColorName(updateCarRequest.getColorName()));
        }

            try{
                car.setPhoto(BlobUtil.newSerialBlob(photoBytes));
            }
            catch (SQLException exception){
                throw new InternalServerException(Messages.CarImageUpload.CAR_IMAGE_UPLOAD_FAILED + exception.getMessage());
            }
        carRepository.save(car);
        return new SuccessResult(Messages.CarMessages.DATA_UPDATED_SUCCESSFULLY);
    }

    public byte[] getCarPhotoByCarId(Long carId) throws SQLException {
        Optional<Car> theCar = carRepository.findById(carId);
        if(theCar.isEmpty()){
            throw new ResourceNotFoundException("Sorry, Car not found!");
        }
        Blob photoBlob = theCar.get().getPhoto();
        if(photoBlob != null){
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public DataResult<GetByIdCarResponse> getById(Long id) throws SQLException {
        Car car =  carRepository.findById(id).orElseThrow(()-> new CarNotFoundException(Messages.CarMessages.CAR_ID_NOT_FOUND));
        Blob photoBlob = car.getPhoto();
        byte[] photoBytes = BlobUtil.getPhotoDataFromBlob(photoBlob);
        GetByIdCarResponse getByIdCarResponse = mapperService.forResponse().map(car, GetByIdCarResponse.class);
        getByIdCarResponse.setPhoto(BlobUtil.base64BlobToString(photoBytes));
        return new SuccessDataResult<>(getByIdCarResponse);
    }

    @Override
    public void delete(Long id) {
        Optional<Car> car = carRepository.findById(id);
        if(car.isPresent()){
            carRepository.deleteById(id);
        }
    }
    public DataResult<List<Car>> searchCars(CarSearchCriteria criteria) {
        List<Car> cars = carRepository.findCars(criteria);
        return new SuccessDataResult<>(cars);
    }

    @Override
    public DataResult<CarListResponse> getCarByBrandAndModel(String brand, String model) throws SQLException {
        Optional<Car> carOptional = carRepository.findByBrand_NameAndName(brand, model);

        if (!carOptional.isPresent()) {
            return new ErrorDataResult<>("Car not found");
        }

        Car car = carOptional.get();
        byte[] photoBytes = getCarPhotoByCarId(car.getId());
        String base64Photo = BlobUtil.base64BlobToString(photoBytes);

        CarListResponse carListResponse = getCarListResponse(car);
        carListResponse.setPhoto(base64Photo);

        return new SuccessDataResult<>(carListResponse);

    }

    @Override
    public void updateKilometer(Long carId, int kilometer) {
        checkIsExistsByCarId(carId);
        Car car = carRepository.findById(carId).get();
        checkIfReturnKilometerValid(car.getKilometer(), kilometer);
        car.setKilometer(kilometer);
        carRepository.save(car);
    }

    @Override
    public Car findByCarId(Long carId) {
        //checkIsExistsByCarId(carId);
        return carRepository.findById(carId).get();
    }

    @Override
    public void checkIsExistsByCarId(Long carId) {
        if(!this.carRepository.existsById(carId)){
            throw new CarNotFoundException(Messages.CarMessages.CAR_ID_NOT_FOUND + carId);
        }
    }

    private CarListResponse getCarListResponse(Car car) throws SQLException {

        Blob photoBlob = car.getPhoto();
        byte[] photoBytes = BlobUtil.getPhotoDataFromBlob(photoBlob);
        CarListResponse carListResponse = mapperService.forResponse().map(car, CarListResponse.class);
        carListResponse.setPhoto(BlobUtil.base64BlobToString(photoBytes));
        return carListResponse;
    }

    private void checkIfReturnKilometerValid(int beforeKilometer, int afterKilometer) throws ReturnKilometerLessThanRentKilometerException {
        if(beforeKilometer > afterKilometer){
            // TESLİM EDİLEN KİLOMETRE KİRALANAN KİLOMETREDEN AZ OLAMAZ
            throw new ReturnKilometerLessThanRentKilometerException(Messages.CarMessages.DELIVERED_KILOMETER_CANNOT_LESS_THAN_RENTED_KILOMETER);
        }
    }
}
