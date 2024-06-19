import { IArticulo } from "../IArticulo";
import { IPromocion } from "../IPromocion";

export interface ICartItem {
    product : IArticulo | IPromocion;
    amount : number;
}