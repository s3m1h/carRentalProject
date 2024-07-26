package ksu.bitirmeserver.service.impl;

import ksu.bitirmeserver.constants.Messages;
import ksu.bitirmeserver.dtos.request.CreateCarRentalRequest;
import ksu.bitirmeserver.dtos.request.ReceiveTheCarRequest;
import ksu.bitirmeserver.dtos.response.GetByIdRentalResponse;
import ksu.bitirmeserver.dtos.response.CarRentalListResponse;
import ksu.bitirmeserver.exception.InvalidRentalRequestException;
import ksu.bitirmeserver.exception.RentalCarNotFoundException;
import ksu.bitirmeserver.exception.RentalNotFoundException;
import ksu.bitirmeserver.model.Car;
import ksu.bitirmeserver.model.City;
import ksu.bitirmeserver.model.Rental;
import ksu.bitirmeserver.model.User;
import ksu.bitirmeserver.repository.RentalRepository;
import ksu.bitirmeserver.repository.UserRepository;
import ksu.bitirmeserver.service.CarService;
import ksu.bitirmeserver.service.CityService;
import ksu.bitirmeserver.service.RentalService;
import ksu.bitirmeserver.service.UserService;
import ksu.bitirmeserver.utilities.mappers.ModelMapperService;
import ksu.bitirmeserver.utilities.results.DataResult;
import ksu.bitirmeserver.utilities.results.Result;
import ksu.bitirmeserver.utilities.results.SuccessDataResult;
import ksu.bitirmeserver.utilities.results.SuccessResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RentalServiceImpl implements RentalService {
    private final ModelMapperService modelMapperService;
    private final RentalRepository rentalRepository;
    private final CarService carService;
    private final UserService userService;
    private final CityService cityService;
    @Override
    public Result add(CreateCarRentalRequest rentalCarRequest) {
        if (rentalCarRequest.getFinishDate().isBefore(rentalCarRequest.getStartDate())) {
            throw new InvalidRentalRequestException("Giriş tarihi çıkış tarihinden önce olmalıdır.");
        }
        if (rentalCarRequest.getCarId() == null || rentalCarRequest.getUserId() == null ||
                rentalCarRequest.getRentedCity() == null || rentalCarRequest.getDeliveredCity() == null) {
            throw new InvalidRentalRequestException("Araç ID, Kullanıcı ID ve Şehir ID'leri boş olamaz.");
        }
        Car car = carService.findByCarId(rentalCarRequest.getCarId());
        User user = userService.findByUserId(rentalCarRequest.getUserId());
        City rentedCity = cityService.findByCityName(rentalCarRequest.getRentedCity());
        City deliveredCity = cityService.findByCityName(rentalCarRequest.getDeliveredCity());

        List<Rental> existingRents = car.getRentals();
        boolean carIsAvailable = isCarAvailable(rentalCarRequest, existingRents);
        if (carIsAvailable) {
            Rental rentalCar = new Rental();
            rentalCar.setStartDate(rentalCarRequest.getStartDate());
            rentalCar.setFinishDate(rentalCarRequest.getFinishDate());
            rentalCar.setCustomerFullName(rentalCarRequest.getCustomerFullName());
            rentalCar.setCustomerEmail(user.getEmail());
            rentalCar.setCar(car);
            rentalCar.setRentedCity(rentedCity);
            rentalCar.setDeliveredCity(deliveredCity);
            rentalCar.setRentedKilometer(car.getKilometer());
            rentalCar.setDeliveredKilometer(car.getKilometer());
            rentalCar.setRentalConfirmationCode(generateConfirmationCode()); // assuming there's a method for this
            rentalCar.setUser(user);

            car.addRental(rentalCar);
            rentalRepository.save(rentalCar);
            return new SuccessResult("Kiralama işlemi başarıyla gerçekleştirildi.");
        } else {
            throw new InvalidRentalRequestException("Üzgünüz, bu araç seçilen tarihlerde müsait değil.");
        }
    }

    @Override
    public Result receiveTheCar(ReceiveTheCarRequest receiveTheCarRequest) {
        checkIfExistsRentalCarIdAndCarId(receiveTheCarRequest.getRentalCarId(), receiveTheCarRequest.getCarId());
        Rental rental = this.rentalRepository.findById(receiveTheCarRequest.getRentalCarId()).get();
        carService.updateKilometer(receiveTheCarRequest.getCarId(),rental.getDeliveredKilometer());
        rental.setDeliveredKilometer(rental.getCar().getKilometer());
        rentalRepository.save(rental);
        return new SuccessResult();
    }

    @Override
    public Result deleteRental(Long rentalId) {
        checkIsExistsByRentalCarId(rentalId);
        rentalRepository.deleteById(rentalId);
        return new SuccessResult("Kiralama başarıyla silindi.");
    }

    @Override
    public DataResult<GetByIdRentalResponse> getById(Long id) {
        Rental rental = rentalRepository.findById(id)
                .orElseThrow(() -> new RentalNotFoundException("Kiralama bulunamadı."));
        GetByIdRentalResponse rentalResponse = modelMapperService.forResponse()
                .map(rental, GetByIdRentalResponse.class);
        return new SuccessDataResult<>(rentalResponse);
    }

    @Override
    public DataResult<List<CarRentalListResponse>> getAllByRental_CarId(Long carId) {
        List<Rental> rentals = rentalRepository.findByCarId(carId);
        List<CarRentalListResponse> carRentalListResponses = rentals.stream()
                .map(r -> modelMapperService.forResponse().map(r, CarRentalListResponse.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(carRentalListResponses);
    }

    @Override
    public DataResult<List<CarRentalListResponse>> getAll() {
        List<Rental> rentals = rentalRepository.findAll();
        List<CarRentalListResponse> carRentalListResponses = rentals.stream()
                .map(r -> modelMapperService.forResponse().map(r, CarRentalListResponse.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(carRentalListResponses);
    }

    @Override
    public void checkIsExistsByRentalCarId(Long id) {
        if (!rentalRepository.existsById(id)) {
            throw new RentalNotFoundException("Kiralama bulunamadı.");
        }
    }

    @Override
    public DataResult<List<CarRentalListResponse>> getRentalsByUserEmail(String email) {
        List<Rental> rentals = rentalRepository.findByCustomerEmail(email);
        List<CarRentalListResponse> carRentalListResponses = rentals.stream()
                .map(r -> modelMapperService.forResponse().map(r, CarRentalListResponse.class))
                .collect(Collectors.toList());
        return new SuccessDataResult<>(carRentalListResponses);
    }

    private boolean isCarAvailable(CreateCarRentalRequest rentalRequest, List<Rental> existingRents) {
        return existingRents.stream()
                .noneMatch(existingRent ->
                        (rentalRequest.getStartDate().isEqual(existingRent.getStartDate()) ||
                                rentalRequest.getFinishDate().isEqual(existingRent.getFinishDate())) ||
                                (rentalRequest.getStartDate().isBefore(existingRent.getFinishDate()) &&
                                        rentalRequest.getFinishDate().isAfter(existingRent.getStartDate())));
    }

    private void checkIfExistsRentalCarIdAndCarId(Long rentalCarId, Long carId) throws RentalCarNotFoundException {
        if(!this.rentalRepository.existsByIdAndCar_Id(rentalCarId,carId)){
            throw new RentalCarNotFoundException(Messages.RentalCarMessages.RENTAL_CAR_ID_OR_CAR_ID_NOT_FOUND);
        }
    }
    private String generateConfirmationCode() {
        // Implement your confirmation code generation logic here
        return UUID.randomUUID().toString();
    }
}
