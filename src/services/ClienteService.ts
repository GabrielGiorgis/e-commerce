import { IClientePost } from "../types/Cliente/IClientePost";
import { ICliente } from "../types/Cliente/ICliente";
import { BackendClient } from "./BackendClient";

export class ClienteService extends BackendClient<
  ICliente,
  IClientePost,
  IClientePost
> {
  async getByUserId(id: number) {
    try {
      const response = await fetch(`${this.baseUrl}/findCliente/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  }
}
