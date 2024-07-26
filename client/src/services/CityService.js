import { api, getHeaderWithAppJson } from "./AxiosServiceBase";


export async function addCity(cityName) {
  const formData = new FormData();
  formData.append("cityName", cityName);

  const response = await api.post("/api/cities", formData, {headers:getHeaderWithAppJson()});
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}
export async function getAllCities() {
  try {
    const result = await api.get("/api/cities",{headers:getHeaderWithAppJson()});
    return result.data.data;
  } catch (error) {
    throw new "Şehirleri getirme işlemi başarısız oldu..";
  }
}
export async function getBrandById(id) {
  try {
    const result = await api.get(`api/cities/city/${id}`,{headers:getHeaderWithAppJson()});
    return result.data;
  } catch (error) {
    throw new Error(`Şehir getirme işlemi başarısız: ${id}`);
  }
}

export async function updateCity(id, data) {
  const formData = new FormData();
  formData.append("cityName", data.cityName);
  const response = await api.put(`/api/cities/update/${id}`, formData, {headers:getHeaderWithAppJson()});
  return response;
}
export async function deleteCity(id) {
	try {
		const response = await api.delete(`api/cities/delete/${id}`,{headers:getHeaderWithAppJson()});
		return response.data.data;
	} catch (error) {
    console.log(error.message)
		return error.message
	}
}