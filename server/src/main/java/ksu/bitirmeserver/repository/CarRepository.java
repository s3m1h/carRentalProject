package ksu.bitirmeserver.repository;

import ksu.bitirmeserver.dtos.request.CarSearchCriteria;
import ksu.bitirmeserver.model.Car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car,Long> {
    @Query("SELECT c FROM Car c WHERE " +
            "(:#{#criteria.pickupCity} IS NULL OR c.rentals IS EMPTY OR c.rentals IS NOT EMPTY AND c.rentals[0].rentedCity.name = :#{#criteria.pickupCity}) AND " +
            "(:#{#criteria.dropOffCity} IS NULL OR c.rentals IS EMPTY OR c.rentals IS NOT EMPTY AND c.rentals[0].deliveredCity.name = :#{#criteria.dropoffCity}) AND " +
            "(:#{#criteria.pickupDate} IS NULL OR c.rentals IS EMPTY OR c.rentals IS NOT EMPTY AND c.rentals[0].startDate <= :#{#criteria.pickupDate}) AND " +
            "(:#{#criteria.dropOffDate} IS NULL OR c.rentals IS EMPTY OR c.rentals IS NOT EMPTY AND c.rentals[0].finishDate >= :#{#criteria.dropoffDate}) AND " +
            "(:#{#criteria.carBodyType} IS NULL OR c.carBodyType = :#{#criteria.carBodyType}) AND " +
            "(:#{#criteria.fuelType} IS NULL OR c.fuelType = :#{#criteria.fuelType}) AND " +
            "(:#{#criteria.transmissionType} IS NULL OR c.transmissionType = :#{#criteria.transmissionType}) AND " +
            "(:#{#criteria.minPrice} IS NULL OR c.dailyPrice >= :#{#criteria.minPrice}) AND " +
            "(:#{#criteria.maxPrice} IS NULL OR c.dailyPrice <= :#{#criteria.maxPrice})")
    List<Car> findCars(@Param("criteria") CarSearchCriteria criteria);
    Optional<Car> findByBrand_NameAndName(String brandName, String carName);
    boolean existsById(Long id);
}
