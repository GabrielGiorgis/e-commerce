import { IImagenPromocion } from "./IImagenPromocion"
import { IPromocionDetalle } from "./IPromocionDetalle"
import { ISucursalShort } from "./ISucursalShort"


export interface IPromocion{
    id: number
    eliminado: boolean
    denominacion: string
    fechaDesde: string
    fechaHasta: string
    horaDesde: string
    horaHasta: string
    descripcionDescuento: string
    precioPromocional: number
    tipoPromocion: string
    promocionDetalles: IPromocionDetalle[]
    imagenes: IImagenPromocion[]
    sucursales: ISucursalShort[]
}
