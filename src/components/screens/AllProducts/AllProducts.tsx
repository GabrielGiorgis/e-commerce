import { useEffect, useState } from "react";
import { ICategoria } from "../../../types/ICategoria";
import { Loader } from "../../ui/Loader/Loader";
import { ProductItem } from "../ProductItem/ProductItem";
import "./AllProducts.css";
import { IArticulo } from "../../../types/IArticulo";

const API_URL = import.meta.env.VITE_API_URL;

const AllProducts = () => {
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticulos = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}/articulo`);
    const data = await response.json();
    setArticulos(data);
    setIsLoading(false);
  };

  const fetchCategorias = async () => {
    const response = await fetch(`${API_URL}/categoria`);
    const data = await response.json();
    setCategorias(data);
  };

  useEffect(() => {
    fetchArticulos();
    fetchCategorias();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredArticulos = articulos
    .filter(
      (articulo) =>
        (selectedCategory
          ? articulo.categoria.denominacion === selectedCategory
          : true) &&
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="products-list-container">
          <h1 className="title">Todos los artículos</h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="category-dropdown">
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.denominacion}
                  </option>
                ))}
              </select>
            </div>
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

export default AllProducts;
