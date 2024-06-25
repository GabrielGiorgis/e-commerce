import { IProvincia } from "../Provincia/IProvincia";

export interface ILocalidad {
  id: number;
  nombre: string;
  provincia: IProvincia;
}
