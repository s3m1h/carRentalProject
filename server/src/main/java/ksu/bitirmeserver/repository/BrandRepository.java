package ksu.bitirmeserver.repository;

import ksu.bitirmeserver.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    Brand findByName(String name);

}
