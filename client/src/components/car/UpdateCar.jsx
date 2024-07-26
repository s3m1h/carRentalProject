import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Urls from "~/constants/Urls";
import { getAllBrands } from "~/services/BrandService";
import { getCarById, updateCar } from "~/services/CarService";
import { getAllColors } from "~/services/ColorService";

const UpdateCar = () => {
  const [car, setCar] = useState({
    carName: "",
    modelYear: 0,
    dailyPrice: 0,
    description: "",
    carBodyType: "",
    fuelType: "",
    transmissionType:"",
    colorId: "",
    brandId: "",
    photo: "",
  });
  const [brands, setBrands] = useState([
    {
      id: "",
      brandName: "",
    },
  ]);
  const [colors, setColors] = useState([
    {
      id: "",
      colorName: "",
    },
  ]);
  const [photo, setPhoto] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { carId } = useParams();
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(carId);

        setCar(carData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCar();
    fetchBrands();
    fetchColors();
  }, []);
  const fetchBrands = async () => {
    try {
      const result = await getAllBrands();
      setBrands(result);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const fetchColors = async () => {
    try {
      const result = await getAllColors();
      setColors(result);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setPhoto(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCar(carId, car, photo);
      if (response.status === 200) {
        setSuccessMessage("Car güncelleme tamamlandı..!");
        const updatedCarData = await getCarById(roomId);
        setCar(updatedCarData);
        setImagePreview(updatedCarData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Car güncelleme tamamlanamadı..");
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
            <h2 className="mt-5 mb-2">Araç güncelleme sayfası</h2>
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

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="brandName" className="form-label">
                  Marka seç
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleCarInputChange}
                  placeholder="Marka seçimi"
                  name="brandId"
                >
                  <option>Marka seçiniz...</option>

                  {brands.map((brand) => (
                    <option
                      selected={brand.brandName === car.brandName}
                      key={brand.id}
                      value={brand.id}
                    >
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="colorName" className="form-label">
                  Renk Seç
                </label>
                <select
                  name="colorId"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleCarInputChange}
                  placeholder="Renk seçimi"
                >
                  <option>Renk seçiniz...</option>
                  {colors.map((color) => (
                    <option
                      selected={color.colorName === car.colorName}
                      key={color.id}
                      value={color.id}
                    >
                      {color.colorName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="carBodyType" className="form-label">
                  Kasa tipi
                </label>
                <select
                  name="carBodyType"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleCarInputChange}
                >
                  <option>Kasa tipi seçiniz..</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Panelvan">Panelvan</option>
                  <option value="Minivan">Minivan</option>
                  <option value="PickUp">PickUp</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="carFuelType" className="form-label">
                  Yakıt tipi
                </label>
                <select
                  name="fuelType"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleCarInputChange}
                >
                  <option>Yakıt tipi seçiniz...</option>
                  <option value="Benzin">Benzin</option>
                  <option value="Dizel">Dizel</option>
                  <option value="Elektrik">Elektrik</option>
                  <option value="LPG">LPG</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="transmissionType" className="form-label">
                  Vites tipi
                </label>
                <select
                  name="transmissionType"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleCarInputChange}
                >
                  <option>Vites tipi seçiniz...</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Otomatik</option>

                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="carName" className="form-label">
                  Model ismi
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="carName"
                  name="carName"
                  value={car.carName}
                  onChange={handleCarInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="modelYear" className="form-label">
                  Model yılı
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="modelYear"
                  name="modelYear"
                  value={car.modelYear}
                  onChange={handleCarInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dailyPrice" className="form-label">
                  Fiyatı
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="dailyPrice"
                  name="dailyPrice"
                  value={car.dailyPrice}
                  onChange={handleCarInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Bilgi
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={car.description}
                  onChange={handleCarInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Car Photo
                </label>
                <input
                  required
                  multiple
                  accept="image/*"
                  name="photo"
                  id="photo"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={`data:image/jpeg;base64,${imagePreview}`}
                    alt="Görüntülenen araba resmi."
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="mb-3"
                  ></img>
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex mt-2">
                <Link to={"/admin/cars"} className="btn btn-outline-info">
                  Geri Dön
                </Link>
                <button type="submit" className="btn btn-outline-primary ml-5">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateCar;
