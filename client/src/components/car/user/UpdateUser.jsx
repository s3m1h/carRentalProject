import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAllRoles } from "~/services/RoleService";
import { getUserById, updateUser } from "~/services/UserService";

const UpdateUser = () => {
  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleName: "",
  });
  const [roles, setRoles] = useState([
    {
      id: "",
      roleName: "",
    },
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { userId } = useParams();

  const handleInputChange = (e) => {
    const name = e.target.name; // name değişmiyor
    let value = e.target.value; // value değişebilir o yuzden let
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error(error.message);
      }
    };
    const fetchRoles = async () => {
      try {
        const result = await getAllRoles();
        setRoles(result);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchUser();
    fetchRoles();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(userId, user);
      if (response.status === 200) {
        setSuccessMessage("Kullanıcı başarılı bir şekilde Düzenlendi..");
        const updatedUserData = await getUserById(userId);
        setUser(updatedUserData);
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
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Kullanıcıyı Güncelle</h2>
          {successMessage && (
            <div className="alert alert-success fade show">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-danger fade show">{errorMessage}</div>
          )}
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                İsim
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Soyisim
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Kullanıcı adı
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rolName" className="form-label">
                Rol seçimi
              </label>
              <select
                name="roleName"
                className="form-select"
                aria-label="Default select example"
                onChange={handleInputChange}
                value={user.roleName}
              >
                <option value="">Rol seçiniz...</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Yeni Şifre
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="password"
                name="password"
                placeholder="Yeni şifreyi giriniz.."
                onChange={handleInputChange}
              />
            </div>
            <Link to={"/admin/users"} className="btn btn-outline-info ml-5">
              Geri dön
            </Link>
            <button type="submit" className="btn btn-outline-primary ml-5">
              Kaydet
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
