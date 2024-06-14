import { IArticulo } from "./IArticulo";

//Como el carrito necesita este atributo e IArticulo es 
//utilizado para las peticiones, creamos el IArticuloCarrito
export interface IArticuloCart extends IArticulo {
    amount: number;
    suma?: number
}