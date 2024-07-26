package ksu.bitirmeserver.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import java.util.List;

@Table(name = "colors")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "color_hex")
    private String colorHex;

    @OneToMany(mappedBy = "color")
    List<Car> cars;
}
