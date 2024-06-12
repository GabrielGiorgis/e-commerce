import { IArticuloManufacturadoDetalle } from "./IArticuloManufacturadoDetalle"
import { ICategoria } from "./ICategoria"
import { IImagenArticulo } from "./IImagen"
import { ISucursalShort } from "./ISucursalShort"

export interface IArticulo {
    id: number
    eliminado: boolean
    denominacion: string
    precioVenta: number
    imagenes: IImagenArticulo[]
    precioCompra: number
    unidadMedida: string
    sucursal: ISucursalShort[]
    categoria: ICategoria
    descripcion ?: string
    tiempoEstimadoMinutos ? : number
    articuloManufacturadoDetalles ?: IArticuloManufacturadoDetalle[]
}