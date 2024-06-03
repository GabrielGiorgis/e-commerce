import { useEffect, useState } from "react";
//import { CategoriaService } from "../../../services/CategoriaService";
import { ICategoria } from "../../../types/ICategoria";
import { CardCategoria } from "../../ui/Card/Card";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const Categories = () => {

  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  //const categoriaService = new CategoriaService(API_URL + "/categoria");

  useEffect(() => {
    const getCategorias = async () => {
      const categoriasFetch: ICategoria[] = await fetch(`${API_URL}/sucursal/1/categorias`).then((response) => response.json());
      if (categoriasFetch) {
        setCategorias(categoriasFetch);
      }
    }
    getCategorias();
  }, [])

  return (
    <>
      <p className="title">Nuestros productos</p>
      <div className="cards-container">
        {categorias
          .filter((categoria) => categoria.eliminado !== true && !categoria.esParaElaborar)
          .map((categoria) => (
            <div key={categoria.id} className="card-container">
              <CardCategoria categoria={categoria} />
            </div>
          ))}

      </div>
    </>
  );
};

export default Categories;
