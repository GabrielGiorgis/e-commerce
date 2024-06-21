import { ICliente } from "../types/ICliente";
import { BackendClient } from "./BackendClient";

export class ClienteService extends BackendClient<
    ICliente,
    ICliente,
    ICliente
> {

    async getByUserId(id: number) {
        try {
            const response = await fetch(`${this.baseUrl}/findCliente/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching categorias:", error);
        }
    }
    
}