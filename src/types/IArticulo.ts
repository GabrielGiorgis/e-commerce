import { IImagenArticulo } from "./IImagen"

export interface IArticulo{
    id: number
    denominacion: string
    precioVenta: number
    imagenes: IImagenArticulo[]
}