import React, { useEffect, useState } from "react";
import { ICliente } from "../../../types/ICliente";
import { IPedidoPost } from "../../../types/Pedido/IPedidoPost";
import { ClienteService } from "../../../services/ClienteService";

const HistorialPedidos = () => {

  const [cliente, setCliente] = useState<ICliente>();

  const API_URL = import.meta.env.VITE_API_URL;
  const clienteService = new ClienteService(`${API_URL}/cliente`);

  useEffect(() => {
    getCliente();
  }, []);

  const getCliente = async () => {
    const userid = localStorage.getItem('idUser');
    if (userid) {
      const cliente = await clienteService.getById(Number(userid));
      console.log(cliente);
      if (cliente) {
        setCliente(cliente);
      } else {
        console.log("No se encontro el cliente");
      }
    }

  }


  /* TODO: TRAER USUARIO CLIENTE DE AUTH0 */
  if (cliente) {
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
  }else{
    return <div>No hay un cliente activo</div>;
  }
};

export default HistorialPedidos;
