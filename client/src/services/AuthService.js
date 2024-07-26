import { api, getHeaderWithAppJson } from "./AxiosServiceBase";



export async function registerUser(data){
    try{
        const response = await api.post("/api/auth/register",data);
        return response.data;
    }catch(error){
        if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
    }
}
export async function loginUser(data) {
	try {
		const response = await api.post("/api/auth/login", data)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`/api/users/profile/${userId}`, {
			headers: getHeaderWithAppJson()
		})
		return response.data
	} catch (error) {
		throw error
	}
}
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/api/users/${userId}`, {
			headers: getHeaderWithAppJson()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/api/users/${userId}`, {
			headers: getHeaderWithAppJson()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getRentalsByUserId(userId, token) {
	try {
		const response = await api.get(`/api/rentals/user/${userId}`, {
			headers: getHeaderWithAppJson()
		})
		return response.data
	} catch (error) {
		console.error("Kiralama bilgileri getirilirken bir sorunla karşılaşıldı:", error.message)
		throw new Error("Kiralama bilgileri getirilirken bir sorunla karşılaşıldı.")
	}
}