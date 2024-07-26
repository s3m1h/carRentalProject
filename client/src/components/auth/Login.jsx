import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "~/services/AuthService";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSetEmail = () => {
    setEmail('smhacar@gmail.com');
  };

  const handleSetPassword = () => {
    setPassword('admin12345');
  };



  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 my-4">
      <section className="col-12 col-md-6 col-lg-4 p-5 border rounded shadow-sm bg-light">
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}

        <div className="text-center mb-4">
          <img src={"login.png"} alt="Logo" style={{ width: "100px" }} />
        </div>

        <h2 className="text-center mb-4">Giriş Sayfası</h2>
		<p className="text-center">admin: smhacar@gmail.com : admin12345</p>
      <p className="text-center">user: smh@gmail.com : semih123</p>
      <p className="text-center">user: semih_acar01@hotmail.com : user123</p>

        <form onSubmit={handleSubmit} className="form-signin">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email adresi
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={login.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={login.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Giriş Yap
            </button>
            <span>
              Henüz bir hesabınız yok mu? <Link to="/register">Register</Link>
            </span>
          </div>
        </form>
		<div className="text-center mt-4 ">
      		<Link to="/" className="no-underline">Anasayfaya Dön</Link>
    	</div>
      </section>
    </div>
  );
};
export default Login;
