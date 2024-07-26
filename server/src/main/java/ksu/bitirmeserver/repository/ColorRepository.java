package ksu.bitirmeserver.repository;

import ksu.bitirmeserver.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color, Long> {
    Color findByName(String name);
}
