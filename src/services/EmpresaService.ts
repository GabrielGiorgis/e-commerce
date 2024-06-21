import { IEmpresa } from "../types/IEmpresa";
import { ISucursalShort } from "../types/ISucursalShort";
import { BackendClient } from "./BackendClient";

export class EmpresaService extends BackendClient<
  IEmpresa,
  IEmpresa,
  IEmpresa
> {
  async getSucursalesByEmpresaId(idEmpresa: number): Promise<ISucursalShort[]> {
    // const token = localStorage.getItem("token");
    const response = await fetch(`${this.baseUrl}/${idEmpresa}/sucursales`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data as ISucursalShort[];
  }
}
