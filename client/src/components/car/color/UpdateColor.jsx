import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { Link, useParams } from "react-router-dom";
import Urls from "~/constants/Urls";
import { getColorById, updateColor } from "~/services/ColorService";


const UpdateColor = () => {
  const [colorHex, setColorHex] = useState('#ffffff'); // Varsayılan renk beyaz

  const handleColorChange = (color) => {
    setColorHex(color.hex);
  };

  const [color, setColor] = useState({
    colorName: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { colorId } = useParams();

  const handleInputChange = (e) => {
    const name = e.target.name; // name değişmiyor
    let value = e.target.value; // value değişebilir o yuzden let
    setColor({ ...color, [name]: value });
  };

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const colorData = await getColorById(colorId);

        setColor(colorData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchColor();
  }, [colorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateColor(colorId, color,colorHex);
      if (response.status === 200) {
        setSuccessMessage("Marka başarılı bir şekilde Düzenlendi..");
        const updatedColorData = await getColorById(colorId);
        setColor(updatedColorData);
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
            <h2 className="mt-5 mb-2">Rengi düzenle</h2>
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
             <SketchPicker color={colorHex} onChangeComplete={handleColorChange} />
              <div className="mb-3">
                <label htmlFor="colorName" className="form-label">
                  Renk adı
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="colorName"
                  name="colorName"
                  value={color.colorName}
                  onChange={handleInputChange}
                />
                <div className="form-text">Bir araba rengi giriniz...</div>
              </div>
              <Link to={"/admin/colors"} className="btn btn-outline-info ml-5">
                Geri dön
              </Link>
              <button type="submit" className="btn btn-outline-primary ml-5">
                Renk kaydet
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateColor;
