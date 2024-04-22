import ChecarUsuario from "@/types/ChecarUsuario";
import LoginResult from "@/types/LoginResult";
import User from "@/types/User";
import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8000/api/usuario";

class UserService {
  async checar(chave: string): Promise<ChecarUsuario> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const response = await axios.get<ChecarUsuario>(
      `${API_URL}/checar`,
      config
    );
    return response.data;
  }

  async dados(chave: string): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const response = await axios.get<any>(`${API_URL}/dados`, config);
    return response.data;
  }

  async solicitacoes(
    chave: string,
    pagina: number,
    porPagina: number,
    pesquisa: string
  ): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    let url = `${API_URL}/solicitacoes?pagina=${pagina}`;
    if (pesquisa.trim() !== "") {
      url += `&pesquisa=${encodeURIComponent(pesquisa)}`;
    }
    const response = await axios.get<any>(url, config);
    return response.data;
  }

  async enderecos(chave: string): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const response = await axios.get<any>(`${API_URL}/enderecos`, config);
    return response.data;
  }

  async editarEndereco(
    chave: string,
    id_endereco: string,
    nm_estado: string,
    nm_cidade: string,
    nm_cep: string,
    nm_bairro: string,
    nm_rua: string,
    nm_complemento: string,
    nu_casa: number
  ): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const params = new URLSearchParams();
    params.append("id_endereco", id_endereco);
    params.append("nm_estado", nm_estado);
    params.append("nm_cidade", nm_cidade);
    params.append("nm_cep", nm_cep);
    params.append("nm_bairro", nm_bairro);
    params.append("nm_rua", nm_rua);
    params.append("nm_complemento", nm_complemento);
    params.append("nu_casa", nu_casa.toString());
    const response = await axios.post<any>(
      `${API_URL}/editarEndereco`,
      params,
      config
    );
    return response.data;
  }

  logar(
    email: string,
    senha: string
  ): Promise<AxiosResponse<LoginResult, any>> {
    const params = new URLSearchParams();
    params.append("nm_email", email);
    params.append("nm_senha", senha);

    return axios.post<LoginResult>(`${API_URL}/logar`, params);
  }

  async residuos(chave: string): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const response = await axios.get<any>(
      "http://localhost:8000/api/residuos/lista",
      config
    );
    return response.data;
  }

  async produtos(chave: string): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const response = await axios.get<any>(
      "http://localhost:8000/api/produtos/lista",
      config
    );
    return response.data;
  }

  async materiais(chave: string, nome: number): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const response = await axios.get<any>(
      `http://localhost:8000/api/materiais/obter?id_residuo=${nome}`,
      config
    );
    return response.data;
  }

  async enviarSolicitacao(chave: string, lista: any): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const params = new URLSearchParams();
    params.append("lista_materiais", JSON.stringify(lista));
    const response = await axios.post<any>(
      `http://localhost:8000/api/solicitacoes/adicionar`,
      params,
      config
    );
    return response.data;
  }

  async comprarProdutos(chave: string, lista: any): Promise<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${chave}`,
      },
    };
    const params = new URLSearchParams();
    params.append("lista_produtos", JSON.stringify(lista));
    const response = await axios.post<any>(
      `http://localhost:8000/api/produtos/comprar`,
      params,
      config
    );
    return response.data;
  }
}

export default new UserService();
