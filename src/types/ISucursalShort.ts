import { IDomicilio } from "./IDomicilio"

export interface ISucursalShort {
    nombre: string
    horarioApertura: string
    horarioCierre: string
    esCasaMatriz: boolean
    domicilio: IDomicilio
}