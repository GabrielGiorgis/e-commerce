import { IPedidoPost } from "../types/Pedido/IPedidoPost";

const API_URL = import.meta.env.VITE_API_URL;
export async function createPreferenceMP(pedido?: IPedidoPost) {
    const url = `${API_URL}/pedido/create_preference_mp`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
    });
    const data = await response.json();
    return data;
}
