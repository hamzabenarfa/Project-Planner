import api from "@/lib/axios-instance";
import { Response } from "@/types/axios.types";

class AuthService {
  async logout(): Promise<Response<string>> {
    try {
      const response = await api.post<string>("/auth/logout");
      return {
        success: true,
        data: response.data,
      };
    } catch (error:any) {
      return {
        success: false,
        data: error.data,
      };
    }
  }


}

export default new AuthService();
