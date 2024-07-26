import React, {  createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {}
})
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)


	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
		  const decodedUser = jwtDecode(token);
		  setUser(decodedUser);
		}
	  }, []);


	const handleLogin = (token) => {
		const decodedUser = jwtDecode(token)
		localStorage.setItem("userId", decodedUser.sub)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		setUser(decodedUser)
	}

	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}
export const useAuth = () => {
	return useContext(AuthContext)
}

export default AuthProvider;
