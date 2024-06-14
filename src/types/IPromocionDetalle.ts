import { IArticulo } from "./IArticulo"

export interface IPromocionDetalle {
    id: number
    eliminado: boolean
    articulo: IArticulo
    cantidad: number
}