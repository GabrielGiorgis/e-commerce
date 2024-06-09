import { IArticulo } from "./IArticulo"

export interface IArticuloManufacturadoDetalle {
    id: number
    eliminado: boolean
    cantidad : number
    articuloInsumo : IArticulo
}