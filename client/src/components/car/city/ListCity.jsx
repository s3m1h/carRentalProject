import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "~/components/common/Loading";
import Urls from "~/constants/Urls";
import { deleteCity, getAllCities } from "~/services/CityService";

const ListCity = () => {
  const [cities, setCities] = useState([
    {
      id: "",
      cityName: "",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const result = await getAllCities();
      setCities(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
		try {
			const result = await deleteCity(id);
			if (!result) {
				setSuccessMessage(`id: ${id} olan şehir silindi.`)
				fetchCities()
			} else {
				console.error(`Şehir silme başarısız. : ${result.message}`)
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}
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
              <h2>Şehirler listesi</h2>
            </div>

            <Row>
              <Col md={6} className="mb-2 md-mb-0">
                filtreleme işlemi yapılacak
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Link to={"add-city"}>
                  <FaPlus /> Şehir ekle
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Şehir Adı</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {cities.map((city) => (
                  <tr key={city.id} className="text-center">
                    <td>{city.id}</td>
                    <td>{city.cityName}</td>
                    <td className="gap-2">
                      <Link to={`update/${city.id}`} className="gap-2">
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm ml-5">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm ml-5"
                        onClick={() => {handleDelete(city.id)}}
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

export default ListCity;
