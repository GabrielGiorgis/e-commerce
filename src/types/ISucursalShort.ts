import { IDomicilio } from "./Domicilio/IDomicilio";

export interface ISucursalShort {
  id: number;
  eliminado: boolean;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  domicilio: IDomicilio;
}
