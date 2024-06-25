import { ILocalidad } from "../Localidad/ILocalidad";

export interface IDomicilio {
  id: number;
  eliminado: boolean;
  calle: string;
  numero: number;
  cp: number;
  piso: number;
  nroDpto: number;
  localidad: ILocalidad;
}
