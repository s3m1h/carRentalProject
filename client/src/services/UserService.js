import { api, getHeaderWithAppJson } from "./AxiosServiceBase";

export async function getAllUsers() {
    try {
      const result = await api.get("/api/users",{headers:getHeaderWithAppJson()});
      return result.data.data;
    } catch (error) {
      throw new "Kullanıcıları getirme işlemi başarısız oldu..";
    }
  }

  export async function deleteUser(userID) {
	try {
		const response = await api.delete(`api/users/${userID}`,{headers:getHeaderWithAppJson()});
		return response.data.data;
	} catch (error) {
    console.log(error.message)
		return error.message
	}
}

export async function getUserById(userID) {
  try {
    const result = await api.get(`api/users/getById/${userID}`,{headers:getHeaderWithAppJson()});
    return result.data.data;
  } catch (error) {
    throw new Error(`Kullanıcı getirme işlemi başarısız: ${userID}`);
  }
}
export async function updateUser(userID, userData) {
  const formData = new FormData();
  formData.append("firstName", userData.firstName);
  formData.append("lastName", userData.lastName);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("roleName", userData.roleName);
  const response = await api.put(`/api/users/${userID}`, formData, {headers:getHeaderWithAppJson()});
  return response;
}