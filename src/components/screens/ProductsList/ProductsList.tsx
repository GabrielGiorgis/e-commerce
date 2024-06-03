import { useEffect, useState } from "react";
import { IArticulo } from "../../../types/IArticulo"
import { ProductItem } from "../ProductItem/ProductItem"
import { useParams } from "react-router-dom";
import "./ProductsList.css";

const API_URL = import.meta.env.VITE_API_URL;
const ProductsList = () => {
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const idCategoria = useParams().id;

  const fetchData = async () => {
    const response = await fetch(`${API_URL}/categoria/${idCategoria}/articulos`);
    const data = await response.json();
    setArticulos(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="products-list-container">
      {/* <h1 className="title">{articulos[0]?.categoria.denominacion}</h1> */}
      <h1 className="title">Categoría</h1>
      <ul className="products-list">
        {articulos.map((articulo) => (
            <ProductItem product={articulo} />
        ))}
      </ul>
    </div>
  )
}

export default ProductsList
