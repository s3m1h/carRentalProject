import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Urls from "~/constants/Urls";
import { getBrandById, updateBrand } from "~/services/BrandService";

const UpdateBrand = () => {
  const [brand, setBrand] = useState({
    brandName: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { brandId } = useParams();

  const handleInputChange = (e) => {
    const name = e.target.name; // name değişmiyor
    let value = e.target.value; // value değişebilir o yuzden let
    setBrand({ ...brand, [name]: value });
    console.log(brand);
  };

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const brandData = await getBrandById(brandId);
        
        setBrand(brandData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBrand();
  }, [brandId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBrand(brandId, brand);
      if (response.status === 200) {
        setSuccessMessage("Marka başarılı bir şekilde Düzenlendi..");
        const updatedBrandData = await getBrandById(brandId);
        setBrand(updatedBrandData);
        setErrorMessage("");
      } else {
        setErrorMessage("Güncelleme işlemi başarısız.");
      }
    } catch (error) {
      console.error(error);
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
            <h2 className="mt-5 mb-2">Markayı düzenle</h2>
            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">
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
                  value={brand.brandName}
                  onChange={handleInputChange}
                />
                <div className="form-text">Bir araba markası giriniz...</div>
              </div>
              <Link to={"/admin/brands"} className="btn btn-outline-info ml-5">
                Geri dön
              </Link>
              <button type="submit" className="btn btn-outline-primary ml-5">
                Marka kaydet
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateBrand;
