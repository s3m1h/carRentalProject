import React, { useState } from "react";
import { Link } from "react-router-dom";
import Urls from "~/constants/Urls";
import { addBrand } from "~/services/BrandService";

const AddBrand = () => {
  const [newBrand, setNewBrand] = useState({
    brandName: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleBrandInputChange = (e) => {
    const name = e.target.name; // name değişmiyor
    let value = e.target.value; // value değişebilir o yuzden let
    setNewBrand({ ...newBrand, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addBrand(newBrand.brandName);
      if (success !== undefined) {
        setSuccessMessage("Yeni bir marka başarılı bir şekilde kaydedildi..");
        setNewBrand({brandName:""});
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
            <h2 className="mt-5 mb-2">Yeni bir marka ekle</h2>
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
                <label htmlFor="brandName" className="form-label">
                  Marka adı
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="brandName"
                  name="brandName"
                  value={newBrand.brandName}
                  onChange={handleBrandInputChange}
                />
                <div className="form-text">Bir araba markası giriniz...</div>
              </div>
              <Link to={"/admin/brands"} className="btn btn-outline-info ml-5">
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

export default AddBrand;
