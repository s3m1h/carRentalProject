package ksu.bitirmeserver.repository;

import ksu.bitirmeserver.model.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    boolean existsById(Long id);

    List<Rental> findByCustomerEmail(String email);
    List<Rental> findByCarId(Long carId);
    List<Rental> findByUserId(Long userId);
    boolean existsByIdAndCar_Id(Long rentalCarId, Long carId);
}
