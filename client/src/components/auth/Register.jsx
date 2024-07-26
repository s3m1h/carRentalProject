import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { registerUser } from "~/services/AuthService";

const Register = () => {

  const location = useLocation();
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error : ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 my-5">
      <section className="col-12 col-md-6 col-lg-4 p-5 border rounded shadow-sm bg-light">
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        {successMessage && (
          <p className="alert alert-success">{successMessage}</p>
        )}

        <div className="text-center mb-4">
          <img src={"register.png"} alt="Logo" style={{ width: "100px" }} />
        </div>

        <h2 className="text-center mb-4">Register</h2>

        <Form onSubmit={handleRegistration}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>İsim</Form.Label>
            <Form.Control
              name="firstName"
              type="text"
              value={registration.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Soyisim</Form.Label>
            <Form.Control
              name="lastName"
              type="text"
              value={registration.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email adresi</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={registration.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={registration.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Register
            </Button>
            <span>
              Zaten hesabınız var mı? <Link to="/login">Login</Link>
            </span>
          </div>
        </Form>
		<div className="text-center mt-4">
      		<Link to="/" className="no-underline">Anasayfaya Dön</Link>
    	</div>
      </section>
	  
    </div>
  );
};

export default Register;
