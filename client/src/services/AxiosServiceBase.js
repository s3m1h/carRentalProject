import axios from "axios";
import UrlStrings from "~/constants/Urls";

export const api = axios.create({
  baseURL: UrlStrings.BASEURL,
});

export const getHeaderWithMultiFormData = () => {
  const token = localStorage.getItem("token")
  return { 
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data' 
  };
};


export const getHeaderWithAppJson = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}