import { CardCategoria } from "../../ui/Card/Card";
import { ICategoria } from "../../../types/ICategoria";
import { useState } from "react";
import { Loader } from "../../ui/Loader/Loader";
import { Header } from "../../ui/Header/Header";

export const Home = () => {
  const [loading, setLoading] = useState(false);
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div
            className="cards-container"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {categoriasDeMuestra.map((categoria) => (
              <div
                key={categoria.id}
                className="card-container"
                style={{ width: "18rem", padding: "10px", margin: "10px" }}
              >
                <CardCategoria categoria={categoria} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
