import { IDetallePedidoPost } from "../DetallePedido/IDetallePedidoPost";
import { IFactura } from "../Factura/IFactura";

export interface IPedidoPost {
    id? : number,
    horaEstimadaFinalizacion: string,
    total: number,
    totalCosto: number,
    estado: string,
    tipoEnvio: string,
    formaPago: string,
    fechaPedido: string,

    idDomicilio: number,
    idSucursal: number,
    factura: IFactura,
    idCliente: number,
    detallePedidos: IDetallePedidoPost[],
    idEmpleado: number
}