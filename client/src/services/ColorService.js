import { api, getHeaderWithAppJson } from "./AxiosServiceBase";

export async function addColor(colorName, colorHex) {
  const formData = new FormData();
  formData.append("colorName", colorName);
  formData.append("colorHex", colorHex);

  const response = await api.post("/api/colors/add", formData, {
    headers: getHeaderWithAppJson(),
  });
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}
export async function getAllColors() {
  try {
    const response = await api.get("/api/colors", {headers:getHeaderWithAppJson()});
    return response.data.data;
  } catch (error) {
    throw new Error("Renkleri getirme işlemi başarısız...");
  }
}
export async function getColorById(colorID) {
  try {
    const result = await api.get(`api/colors/color/${colorID}`,{headers:getHeaderWithAppJson()});
    return result.data.data;
  } catch (error) {
    throw new Error(`Color getirme işlemi başarısız: ${colorID}`);
  }
}

export async function updateColor(colorID, colorData, colorHex) {
  const formData = new FormData();
  formData.append("colorName", colorData.colorName);
  formData.append("colorHex", colorHex);
  const response = await api.put(`/api/colors/update/${colorID}`, formData, {headers:getHeaderWithAppJson()});
  return response;
}
export async function deleteColor(colorID) {
	try {
		const response = await api.delete(`api/colors/delete/${colorID}`,{headers:getHeaderWithAppJson()});
		return response.data.data;
	} catch (error) {
		return error.message
	}
}