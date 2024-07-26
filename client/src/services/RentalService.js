import { api, getHeaderWithAppJson } from "./AxiosServiceBase"

export async function addRental(rentalData){
    try {
		const response = await api.post(`/api/rentals`, rentalData)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error rented car : ${error.message}`)
		}
	}
}

export async function getAllRentals() {
	try {
		const result = await api.get("/api/rentals", {
			headers: getHeaderWithAppJson()
		})
		return result.data.data
	} catch (error) {
		throw new Error(`Error fetching rentals : ${error.message}`)
	}
}

export async function deleteRental(rentalId) {
	try {
		const result = await api.delete(`/api/rentals/${rentalId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}