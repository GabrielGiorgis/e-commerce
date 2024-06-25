import { IDomicilio } from "../Domicilio/IDomicilio";
import { IUsuarioCliente } from "../UsuarioCliente/IUsuarioCliente";
import { IPedidoPost } from "../Pedido/IPedidoPost";

export interface ICliente {
  id?: number;
  eliminado?: boolean;
  nombre: string;
  apellido: string;
  telefono: string;
  domicilios: IDomicilio[];
  pedidos: IPedidoPost[];
  usuarioCliente: IUsuarioCliente;
}
