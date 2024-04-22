import ViacepResultado from "@/types/ViacepResultado";
import axios, { AxiosResponse } from "axios";

class ViacepService {
  async checar(cep: string): Promise<ViacepResultado> {
    const response = await axios.get<ViacepResultado>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    return response.data;
  }
}

export default new ViacepService();
