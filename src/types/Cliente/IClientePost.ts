import { IDomicilioPost } from "../Domicilio/IDomicilioPost";
import { IUsuarioClientePost } from "../UsuarioCliente/IUsuarioClientePost";
import { IPedidoPost } from "../Pedido/IPedidoPost";

export interface IClientePost {
  nombre: string;
  apellido: string;
  telefono: string;
  domicilios: IDomicilioPost[];
  pedidos: IPedidoPost[];
  usuarioCliente: IUsuarioClientePost;
}
