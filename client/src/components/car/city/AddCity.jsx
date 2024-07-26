import React, { useState } from "react";
import { Link } from "react-router-dom";
import Urls from "~/constants/Urls";
import { addCity } from "~/services/CityService";


const AddCity = () => {
  const [newCity, setNewCity] = useState({
    cityName: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleCityInputChange = (e) => {
    const name = e.target.name; // name değişmiyor
    let value = e.target.value; // value değişebilir o yuzden let
    setNewCity({ ...newCity, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addCity(newCity.cityName);
      if (success !== undefined) {
        setSuccessMessage("Yeni bir marka başarılı bir şekilde kaydedildi..");
        setNewCity({cityName:""});
        setErrorMessage("");
      } else {
        setErrorMessage("Ekleme işlemi başarısız oldu..");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };
  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Yeni bir Şehir ekle</h2>
            {successMessage && (
              <div className="alert alert-success fade show">
                {" "}
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">
                {" "}
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="cityName" className="form-label">
                  Şehir adı
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="cityName"
                  name="cityName"
                  value={newCity.cityName}
                  onChange={handleCityInputChange}
                />
                <div className="form-text">Bir şehir ismi giriniz...</div>
              </div>
              <Link to={"/admin/cities"} className="btn btn-outline-info ml-5">
                Geri dön
              </Link>
              <button type="submit" className="btn btn-outline-primary ml-5">
                Kaydet
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCity;
