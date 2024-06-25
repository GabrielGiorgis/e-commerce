import { IPais } from "../Pais/IPais";

export interface IProvincia {
  id: number;
  nombre: string;
  pais: IPais;
}
