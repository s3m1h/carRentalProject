import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logout from "../auth/Logout";
import { FaSignOutAlt} from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const hideHeader = location.pathname.includes("admin") || location.pathname.includes("register") || location.pathname.includes("login");

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      {!hideHeader && (
        <>
          {isLoggedIn && userRole === "ROLE_ADMIN" && (
            <a href="/admin">
              <button className="w-100 rounded-0 fw-bold btn btn-danger">
                <span className="btn-text">
                Yönetim Kontrol Merkezi
                </span>
              </button>
            </a>
          )}

          <nav className="navbar navbar-expand-lg bg-dark px-5 shadow sticky-top">
            <div className="container">
              <a href="/" className="navbar-brand">
                <img src="logo2.png" alt="logo" height={"36"} />
              </a>
              <button
                className="navbar-toggler custom-toggler"  // Add custom-toggler class here
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light"
                      aria-current="page"
                      to={"/tum-araclar"}
                    >
                      Tüm araçlar
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light"
                      aria-current="page"
                      to={"/about"}
                    >
                      Hakkımızda
                    </NavLink>
                  </li>
                </ul>

                <ul className="d-flex flex-column flex-lg-row navbar-nav align-items-center ">
                  {isLoggedIn ? (
                    <Logout />
                  ) : (
                    <li className="d-flex">
                      <Link className="btn btn-danger text-light mx-2 custom-button" to={"/login"}> 
                        Giriş yap <FaSignOutAlt />
                      </Link>
                      <Link className="btn btn-primary text-light mx-2 custom-button" to={"/register"}>
                        Kayıt ol
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default Header;
