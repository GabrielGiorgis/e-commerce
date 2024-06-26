import { IPedidoPost } from "../types/Pedido/IPedidoPost";
import { BackendClient } from "./BackendClient";

export class PedidoService extends BackendClient<
  IPedidoPost,
  IPedidoPost,
  IPedidoPost
> {
  async sendFactura(idPedido: number) {
    const response = await fetch(
      `${this.baseUrl}/sendFacturaPedido/${idPedido}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
}
