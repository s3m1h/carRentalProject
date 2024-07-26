import { api, getHeaderWithAppJson } from "./AxiosServiceBase";

export async function getAllRoles() {
    try {
      const result = await api.get("/api/roles",{headers:getHeaderWithAppJson()});
      return result.data.data;
    } catch (error) {
      throw new "Rolleri getirme işlemi başarısız oldu..";
    }
  }

export async function getRoleByUserId(userId){
    try{
        const result = await api.get(`/api/roles/${userId}`, {headers:getHeaderWithAppJson()});
        return result.data;
    }
    catch(error){
        throw new "Kullanıcının rol bilgisi alınamadı..";
    }

}
