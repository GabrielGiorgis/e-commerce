import { useEffect, useState } from "react";
import { IArticulo } from "../../../types/IArticulo";
import { ProductItem } from "../ProductItem/ProductItem";
import { useParams } from "react-router-dom";
import "./ProductsList.css";
import { ICategoria } from "../../../types/ICategoria";
import { Loader } from "../../ui/Loader/Loader";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const API_URL = import.meta.env.VITE_API_URL;

const ProductsList = () => {
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const [categoria, setCategoria] = useState<ICategoria>({} as ICategoria);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams().id;

  const fetchData = async () => {
    const response = await fetch(`${API_URL}/categoria/${id}/articulos`);
    const data = await response.json();
    setArticulos(data);
    setIsLoading(false);
  };

  const fetchCategoria = async () => {
    const response = await fetch(`${API_URL}/categoria/${id}`);
    const data = await response.json();
    setCategoria(data);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    fetchCategoria();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredArticulos = articulos
    .filter((articulo) =>
      articulo.denominacion.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.precioVenta - b.precioVenta;
      } else if (sortOrder === "desc") {
        return b.precioVenta - a.precioVenta;
      } else {
        return 0;
      }
    });

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={() => {
        window.location.href = "/";
      }}
    >
      Nuestros productos
    </Link>,
    <Typography key="3" color="text.primary">
      {categoria.denominacion}
    </Typography>,
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="products-list-container">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ margin: "1rem" }}
          >
            {breadcrumbs}
          </Breadcrumbs>
          <h1 className="title">{categoria.denominacion}</h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="sort-dropdown">
              <select value={sortOrder} onChange={handleSortChange}>
                <option value="">Ordenar</option>
                <option value="asc">Menor precio</option>
                <option value="desc">Mayor precio</option>
              </select>
            </div>
          </div>
          <ul className="products-list">
            {filteredArticulos.map((articulo, index) => (
              <ProductItem key={index} product={articulo} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductsList;
