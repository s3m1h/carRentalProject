import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit, FaEye, FaPalette, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "~/components/common/Loading";
import Urls from "~/constants/Urls";
import { deleteColor, getAllColors } from "~/services/ColorService";

const ListColor = () => {
  const [colors, setColors] = useState([
    {
      id: "",
      colorName: "",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    setIsLoading(true);
    try {
      const result = await getAllColors();
      setColors(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (colorId) => {
		try {
      const result = await deleteColor(colorId);
      if (!result) {
        setSuccessMessage(`id: ${colorId} olan renk silindi.`);
        fetchColors();
      } else {
        console.error(`Renk silme başarısız. : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
	}
  return (
    <>
      <div className="container col-md-8 col-lg-6">
        { successMessage && (
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
              <h2>Renkler listesi</h2>
            </div>

            <Row>
              <Col md={6} className="mb-2 md-mb-0">
                filtreleme işlemi yapılacak
              </Col>

              <Col md={6} className="d-flex justify-content-end">
                <Link to={"add-color"}>
                  <FaPlus /> Renk Ekle
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Renk Adı</th>
                  <th>Renk</th>
                  <th>Ayarlar</th>
                </tr>
              </thead>

              <tbody>
                {colors.map((color) => (
                  <tr key={color.id} className="text-center">
                    <td>{color.id}</td>
                    <td>{color.colorName}</td>
                    <td> <FaPalette style={{color:`${color.colorHex}`, fontSize:"25px"}}/></td>
                    <td className="gap-2">
                      <Link to={`update/${color.id}`} className="gap-2">
                        <span className="btn btn-info btn-sm">
                          <FaEye />
                        </span>
                        <span className="btn btn-warning btn-sm ml-5">
                          <FaEdit />
                        </span>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm ml-5"
                        onClick={() => {handleDelete(color.id)}}
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

export default ListColor;
