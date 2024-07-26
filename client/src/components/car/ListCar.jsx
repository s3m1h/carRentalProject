import React, { useEffect, useState } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "~/components/common/Loading";
import Urls from "~/constants/Urls";
import { getAllCars } from "~/services/CarService";

const ListCar = () => {
  const [cars, setCars] = useState([
    {
      carId: "",
      carName: "",
      modelYear:"",
      carBodyType:"",
      fuelType:"",
      transmissionType:"",
      dailyPrice:"",
      description:"",
      kilometer:"",
      colorName:"",
      brandName:"",
      isRented:"",
      photo:null
      
    },
  ]);
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

  // const handleDelete = async (carId) => {
	// 	try {
	// 		const result = await deleteCar(carId);
	// 		if (result === "") {
	// 			setSuccessMessage(`id: ${colorId} olan renk silindi.`)
	// 			fetchColors()
	// 		} else {
	// 			console.error(`Renk silme başarısız. : ${result.message}`)
	// 		}
	// 	} catch (error) {
	// 		setErrorMessage(error.message)
	// 	}
	// 	setTimeout(() => {
	// 		setSuccessMessage("")
	// 		setErrorMessage("")
	// 	}, 3000)
	// }
  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="alert alert-success mt-5">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="alert alert-danger mt-5">{errorMessage}</p>
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
        
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Araçlar listesi</h2>
            </div>

            <Row>
              <Col md={6} className="mb-2 md-mb-0">
                filtreleme işlemi yapılacak
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Link to={"add-car"}>
                  <FaPlus /> Araba Ekle
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Photo</th>
                  <th>Model </th>
                  <th>Marka </th>
                  <th>Renk </th>
                  <th>Model Yılı </th>
                  <th>Kasa tipi</th>
                  <th>Yakıt tipi </th>
                  <th>Vites tipi </th>
                  <th>Fiyat </th>
                  <th>Km </th>
                  <th>Bilgi </th>
                  <th>Kiralanmıs mı</th>
                  <th>Ayarlar</th>
                </tr>
              </thead>

              <tbody>
                {cars.map((car) => (
                  <tr key={car.carId} className="text-center">
                    <td>{car.carId}</td>
                    <td><img className="carImage" src={`data:image/png;base64, ${car.photo}`} alt="Car image" style={{ width: "100%", maxWidth: "50px", height: "auto" }} /></td>
                    <td>{car.carName}</td>
                    <td>{car.brandName}</td>
                    <td>{car.colorName}</td>
                    <td>{car.modelYear}</td>
                    <td>{car.carBodyType}</td>
                    <td>{car.fuelType}</td>
                    <td>{car.transmissionType}</td>
                    <td>{car.dailyPrice}</td>
                    <td>{car.kilometer}</td>
                    <td>{car.description}</td>
                    <td>{car.isRented ? "true": "false"}</td>
                    <td className="gap-2">
                      <Link to={`update/${car.carId}`} className="gap-2">
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm ml-5">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm ml-5"
                        onClick={() => {}}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </>
  );
};

export default ListCar;
