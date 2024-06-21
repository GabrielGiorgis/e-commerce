import React from "react";
import { ICliente } from "../../../types/ICliente";
import { IPedidoPost } from "../../../types/Pedido/IPedidoPost";

const HistorialPedidos: React.FC<{ cliente: ICliente }> = ({ cliente }) => {
  /* TODO: TRAER USUARIO CLIENTE DE AUTH0 */
  return (
    <div>
      <h2>
        Pedidos de {cliente.nombre} {cliente.apellido}
      </h2>
      <ul>
        {cliente.pedidos.map((pedido: IPedidoPost, index: number) => (
          <li key={index}>
            <div>
              <p>
                <strong>Fecha del Pedido:</strong>{" "}
                {new Date(pedido.fechaPedido).toLocaleString()}
              </p>
              <p>
                <strong>Estado:</strong> {pedido.estado}
              </p>
              <p>
                <strong>Total:</strong> ${pedido.total}
              </p>
              <p>
                <strong>Forma de Pago:</strong> {pedido.formaPago}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialPedidos;
