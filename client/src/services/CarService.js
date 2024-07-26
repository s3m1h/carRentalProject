import {
  api,
  getHeaderWithAppJson,
  getHeaderWithMultiFormData,
} from "./AxiosServiceBase";

export async function addCar(carData, photo) {
  const formData = new FormData();
  formData.append(
    "carRequest",
    new Blob([JSON.stringify(carData)], { type: "application/json" })
  );
  formData.append("files", photo);
  const response = await api.post("/api/cars", formData, {
    headers: getHeaderWithMultiFormData(),
  });
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}
export async function getAllCars() {
  try {
    const result = await api.get("/api/cars");
    return result.data.data;
  } catch (error) {
    throw new Error("Veri getirme işlemi başarısız oldu.. ");
  }
}
export async function updateCar(carId, carData, photo) {
  const formData = new FormData();
  formData.append(
    "carRequest",
    new Blob([JSON.stringify(carData)], { type: "application/json" })
  );
  formData.append("files", photo);
  const response = await api.put(`/api/cars/${carId}`, formData, {
    headers: getHeaderWithMultiFormData(),
  });
  return response;
}
export async function getCarById(carID) {
  try {
    const result = await api.get(`api/cars/${carID}`);
    return result.data.data;
  } catch (error) {
    throw new Error(`Araçları getirme işlemi başarısız: ${carID}`);
  }
}
export async function carSearchCriteria(criteria) {
  const formData = new FormData();
  formData.append("pickUpCity", criteria.pickUpCity);
  formData.append("dropOffCity", criteria.dropOffCity);
  formData.append("pickUpDate", criteria.pickUpDate);
  formData.append("dropOffDate", criteria.dropOffDate);
  formData.append("carBodyType", criteria.carBodyType);
  formData.append("fuelType", criteria.fuelType);
  formData.append("transmissionType", criteria.transmissionType);
  formData.append("minPrice", criteria.minPrice);
  formData.append("maxPrice", criteria.maxPrice);
  try {
    const result = await api.get(`/api/cars`, formData, {
      headers: getHeaderWithMultiFormData(),
    });
    return result.data.data;
  } catch (error) {
    throw new Error(`Araçları getirme işlemi başarısız`);
  }
}

export const getCarDetails = async (brand, model) => {
  try {
    const response = await api.get(`/api/cars/${brand}/${model}`, {
      headers: getHeaderWithAppJson(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
};

export const rentCar = async (rentalInfo) => {
  try {
    const response = await api.post("/api/rentals", JSON.stringify(rentalInfo), {
      headers: getHeaderWithAppJson(),
    });

    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Error renting car:", error);
    return { success: false, message: error.message };
  }
};

