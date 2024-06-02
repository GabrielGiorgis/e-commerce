import { useEffect, useState } from "react";
import { IArticulo } from "../../../types/IArticulo"
import { ProductItem } from "../ProductItem/ProductItem"
import { useParams } from "react-router-dom";
import "./ProductsList.css";

const ArticulosDeMuestra: IArticulo[] = [
    {id: 1, denominacion: "Producto 1", precioVenta: Math.random() * 100, imagenes: []},
    {id: 2, denominacion: "Producto 2", precioVenta: Math.random() * 100, imagenes: []},
    {id: 3, denominacion: "Producto 3", precioVenta: Math.random() * 100, imagenes: []},
    {id: 4, denominacion: "Producto 4", precioVenta: Math.random() * 100, imagenes: []},
    {id: 5, denominacion: "Producto 5", precioVenta: Math.random() * 100, imagenes: []},
]
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
    <div>
      <ul className="products-list">
        {articulos.map((articulo, index) => (
            <ProductItem product={articulo} />
        ))}
      </ul>
    </div>
  )
}

export default ProductsList
