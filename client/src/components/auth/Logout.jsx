import React, { useContext } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "./AuthProvider"
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handleLogout();

		setTimeout(()=>{
			navigate("/"); // Anasayfaya yönlendir
		},1000);
		
	  };

	return (
		<>
			<li className="nav-item ">
				<Link className="btn btn-success text-light custom-button" to={"/profile"}>
					<FaUserAlt className="mx-1" /> Profil
				</Link>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<button className="btn btn-danger text-light mx-2 custom-button" onClick={handleLogout}>
				Çıkış yap <FaSignOutAlt/>
			</button>
		</>
	)
}

export default Logout