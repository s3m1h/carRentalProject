
import { Button, Container, Nav, Navbar} from "react-bootstrap";
import {  FaCar, FaCity, FaClipboardList, FaGlobe, FaHome, FaPaintBrush, FaSignOutAlt, FaTags, FaUser  } from "react-icons/fa";
import { AuthContext, useAuth } from "../auth/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
  const { user } = useAuth();
  const auth = useContext(AuthContext)
  const navigate = useNavigate();

// Header sayfası logout butonu
const handleLogout = () => {
  auth.handleLogout();
  setTimeout(() => {
    navigate("/", { replace: true });
  }, 1000);
};

  return (
    <>
       <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand href="/admin">
          <img style={{height:"50px"}} src="/admin.png" alt="admin" /> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="/admin/rentals" className="text-light"><FaClipboardList /> Rentals</Nav.Link>
            <Nav.Link href="/admin/cars" className="text-light"><FaCar /> Cars</Nav.Link>
            <Nav.Link href="/admin/brands" className="text-light"><FaTags /> Brands</Nav.Link>
            <Nav.Link href="/admin/colors" className="text-light"><FaPaintBrush /> Colors</Nav.Link>
            <Nav.Link href="/admin/cities" className="text-light"><FaCity /> Cities</Nav.Link>
            <Nav.Link href="/admin/users" className="text-light"><FaUser /> Users</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-light"><FaGlobe /> </Nav.Link>
          </Nav>
          <Nav >
            <Nav.Link href="#" className="text-light">{user.sub}</Nav.Link>
          </Nav>
          <Button className="logout-button custom-button" onClick={()=>{handleLogout()}}> Çıkış  <FaSignOutAlt/></Button>
        </Navbar.Collapse>
    </Navbar>

    </>
  );
};

export default AdminHeader;
