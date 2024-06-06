import { useEffect, useState } from "react";
import { ICategoria } from "../../../types/ICategoria";
import { CardCategoria } from "../../ui/Card/Card";
import "./Categories.css";
import { Loader } from "../../ui/Loader/Loader";

const API_URL = import.meta.env.VITE_API_URL;
const Categories = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategorias = async () => {
      setIsLoading(true);
      const categoriasFetch: ICategoria[] = await fetch(
        `${API_URL}/sucursal/1/categorias`
      ).then((response) => response.json());
      if (categoriasFetch) {
        setCategorias(categoriasFetch);
      }
      setIsLoading(false);
    };
    getCategorias();
  }, []);

  return (
    <>
      <p className="title">Nuestros productos</p>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="cards-container">
          {categorias
            .filter(
              (categoria) =>
                categoria.eliminado !== true && !categoria.esParaElaborar
            )
            .map((categoria) => (
              <div key={categoria.id} className="card-container">
                <CardCategoria categoria={categoria} />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Categories;
