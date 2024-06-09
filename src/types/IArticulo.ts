import { IArticuloManufacturadoDetalle } from "./IArticuloManufacturadoDetalle"
import { IImagenArticulo } from "./IImagen"

export interface IArticulo {
    id: number
    eliminado: boolean
    denominacion: string
    precioVenta: number
    imagenes: IImagenArticulo[]
    precioCompra: number
    descripcion ?: string
    tiempoEstimadoMinutos ? : number
    articuloManufacturadoDetalles ?: IArticuloManufacturadoDetalle[]
}