import React from "react";
import { CardCategoria } from "../ui/Card";
import { ICategoria } from "../../types/ICategoria";

export const Home = () => {
  const categoriasDeMuestra: ICategoria[] = [
    {
      id: 1,
      denominacion: "CATEGORIA 1",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
    },
    {
      id: 2,
      denominacion: "CATEGORIA 2",
      subCategorias: [],
      sucursal: "SUCURSAL 1",
      eliminado: false,
    },
  ];
  return (
    <div>
        <div className="cards-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {categoriasDeMuestra.map((categoria) => (
            <div key={categoria.id} className="card-container" style={{ width: "18rem", padding: "10px", margin: "10px" }}>
            <CardCategoria categoria={categoria} />
            </div>
        ))}
        </div>
    </div>
  );
};
