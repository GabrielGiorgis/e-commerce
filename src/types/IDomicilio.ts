import { ILocalidad } from "./ILocalidad"

export interface IDomicilio {
    calle: string
    numero: number
    cp: number
    piso: number
    nroDpto: number
    idLocalidad: number
}