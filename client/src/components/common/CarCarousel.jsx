import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getAllCars } from "~/services/CarService";
import KelimeIslemleri from "~/utils/KelimeIslemleri";
import Loading from "./Loading";

const CarCarousel = () => {
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const result = await getAllCars();
      setCars(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {isLoading && <Loading/>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="row">
        {cars.map((car) => (
          <div className="col-md-3 mb-4" key={car.carId}>
            <div className="card h-100">
              <LazyLoadImage
                className="card-img-top"
                src={`data:image/png;base64, ${car.photo}`}
                effect="blur"
                style={{ height: "200px", objectFit: "cover" }}
                alt={car.carName}
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="card-title mb-0">{car.brandName+" "+ car.carName}</h5>
                  <span className="badge bg-secondary">{car.modelYear}</span>
                </div>
                <div className="mt-auto">
                  <ul className="list-group list-group-flush mb-3">

                    <li className="list-group-item">
                      <ion-icon name="flash-outline"></ion-icon>
                      <span className="ms-2">{KelimeIslemleri.duzeltilmisKelime(car.carBodyType)}</span>
                    </li>
                    <li className="list-group-item">
                      <ion-icon name="speedometer-outline"></ion-icon>
                      <span className="ms-2">{car.kilometer} Km / {KelimeIslemleri.duzeltilmisKelime(car.fuelType)}</span>
                    </li>
                    <li className="list-group-item">
                      <ion-icon name="hardware-chip-outline"></ion-icon>
                      <span className="ms-2">{KelimeIslemleri.duzeltilmisKelime(car.transmissionType)}</span>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="card-price mb-0"><strong>{car.dailyPrice} ₺</strong> / Aylık</p>
                    <a href={`/car-detail/${car.brandName}/${car.carName}`} className="btn btn-primary">Şimdi Kirala</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCarousel;
