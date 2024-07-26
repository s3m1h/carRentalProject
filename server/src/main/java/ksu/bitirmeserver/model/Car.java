package ksu.bitirmeserver.model;

import jakarta.persistence.*;
import ksu.bitirmeserver.model.car.CarBodyType;
import ksu.bitirmeserver.model.car.FuelType;
import ksu.bitirmeserver.model.car.TransmissionType;
import lombok.*;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Table(name = "cars")
@AllArgsConstructor
@Entity
@Getter
@Setter
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name; // aslında model ismi

    @Column(name = "modelYear",length = 4, nullable = false)
    private int modelYear;

    @Column(name = "dailyPrice",nullable = false)
    private BigDecimal dailyPrice;

    @Column(name="description")
    private String description;

    @Column(name = "carBodyType")
    @Enumerated(EnumType.STRING)
    private CarBodyType carBodyType; // kasa tipi

    @Column(name = "fuelType")
    @Enumerated(EnumType.STRING)
    private FuelType fuelType; // yakıt tipi

    @Column(name = "transmissionType")
    @Enumerated(EnumType.STRING)
    private TransmissionType transmissionType; // şanzıman türü

    @Column(name = "isRented")
    private boolean isRented = false;

    @Column(name = "kilometer")
    private int kilometer;

    @Lob
    private Blob photo;

    @ManyToOne
    @JoinColumn(name = "color_id",nullable = false)
    private Color color;

    @ManyToOne
    @JoinColumn(name="brand_id",nullable = false)
    private Brand brand;

    @OneToMany(mappedBy = "car",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Rental> rentals;

    public Car() {
        this.rentals = new ArrayList<>();
    }
    public void addRental(Rental rental){
        if (rentals == null){
            rentals = new ArrayList<>();
        }
        rentals.add(rental);
        rental.setCar(this);
        isRented = true;
        String bookingCode = RandomStringUtils.randomNumeric(10);
        rental.setBookingConfirmationCode(bookingCode);
    }
}

