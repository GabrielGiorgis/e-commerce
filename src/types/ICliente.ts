import { IDomicilio } from "./IDomicilio";
import { IImagenCLiente } from "./IImagenCliente";
import { IUsuarioCliente } from "./IUsuarioCliente";
import { IPedidoPost } from "./Pedido/IPedidoPost";

export interface ICliente {
    id?: number;
    eliminado?: boolean;
    nombre: string
    apellido: string
    telefono: string
    email: string
    imagenCliente: IImagenCLiente
    domicilios : IDomicilio[]
    pedidos : IPedidoPost[]
    usuario: IUsuarioCliente
}