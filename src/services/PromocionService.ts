
import { IPromocion } from "../types/IPromocion";
import { BackendClient } from "./BackendClient";

export class PromocionService extends BackendClient<IPromocion, IPromocion, IPromocion> {
    async getAll(): Promise<IPromocion[]> {
        const response = await fetch(`${this.baseUrl}/ventas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await response.json();

        return data;
    }
}
