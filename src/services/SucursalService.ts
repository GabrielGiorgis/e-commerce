import { ICategoria } from "../types/ICategoria";
import { ISucursalShort } from "../types/ISucursalShort";
import { BackendClient } from "./BackendClient";

export class SucursalService extends BackendClient<
  ISucursalShort,
  ISucursalShort,
  ISucursalShort
> {
  async getArticulosBySucursalId(id: number) {
    const response = await fetch(`${this.baseUrl}/${id}/articulos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  async getCategoriasBySucursalId(id: number): Promise<ICategoria[]> {
    const response = await fetch(`${this.baseUrl}/${id}/categorias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
}
