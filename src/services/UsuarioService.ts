import { IUsuarioCliente } from "../types/IUsuarioCliente";
import { BackendClient } from "./BackendClient";

export class UsuarioService extends BackendClient<
  IUsuarioCliente,
  IUsuarioCliente,
  IUsuarioCliente
> {
  async login(usuario: IUsuarioCliente) {
    try {
      const response = await fetch(
        `${this.baseUrl}/login/${usuario.userName}-${usuario.password}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching usuarios:", error);
    }
  }
}
