import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Urls from "~/constants/Urls";
import { getAllBrands } from "~/services/BrandService";
import { addCar } from "~/services/CarService";
import { getAllColors } from "~/services/ColorService";

const AddCar = () => {
  const [newCar, setNewCar] = useState({
    carName: "",
    modelYear: 0,
    dailyPrice: 0,
    description: "",
    carBodyType: "",
    fuelType: "",
    transmissionType:"",
    kilometer:"",
    colorId: 0,
    brandId: 0,
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

  useEffect(() => {
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
    const name = e.target.name;
    let value = e.target.value;
    if (
      name === "dailyPrice" ||
      name === "kilometer" ||
      name === "brandId" ||
      name === "colorId" ||
      name === "modelYear"
    ) {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }

    setNewCar({ ...newCar, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setPhoto(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addCar(newCar,photo);
      if (success !== undefined) {
        setSuccessMessage("A new car was  added successfully !");
        setNewCar({
          carName: "",
          modelYear: 0,
          dailyPrice: 100,
          description: "",
          carBodyType: "",
          fuelType: "",
          transmissionType:"",
          kilometer:"",
          colorId: 0,
          brandId: 0,
        });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding new car");
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
            <h2 className="mt-5 mb-2">Add a New CAR</h2>
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
                    <option key={brand.id} value={brand.id}>
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
                    <option key={color.id} value={color.id}>
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
                  <option value="Automatic">Automatic</option>
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
                  value={newCar.carName}
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
                  value={newCar.modelYear}
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
                  value={newCar.dailyPrice}
                  onChange={handleCarInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="kilometer" className="form-label">
                  Kilometre
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  id="kilometer"
                  name="kilometer"
                  value={newCar.kilometer}
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
                  value={newCar.description}
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
                    src={imagePreview}
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

export default AddCar;
