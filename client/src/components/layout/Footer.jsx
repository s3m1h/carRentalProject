import React from "react";
import {  FaFacebookF, FaGithub, FaGoogle, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const location = useLocation();
  const hideFooter = location.pathname.includes("admin") || location.pathname.includes("register") || location.pathname.includes("login");

  return <>
    {!hideFooter && (

      <footer className="bg-dark text-center">
        {/* Grid container */}
        <div className="container p-4 pb-0">
          {/* Section: Social media */}
          <section className="mb-4">
            {/* Facebook */}
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="#!" role="button"><FaFacebookF /></a>
            {/* Twitter */}
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#55acee' }} href="#!" role="button"><FaTwitter /></a>
            {/* Google */}
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#dd4b39' }} href="#!" role="button"><FaGoogle /></a>
            {/* Instagram */}
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} href="#!" role="button"><FaInstagram /></a>
            {/* Linkedin */}
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="#!" role="button"><FaLinkedinIn /></a>
            {/* Github */}
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#333333' }} href="#!" role="button"><FaGithub /></a>
          </section>
          {/* Section: Social media */}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div className="text-center text-white p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2024 
          <span> CarRental</span>
        </div>
        {/* Copyright */}
      </footer>

    )}
  </>
};

export default Footer;
