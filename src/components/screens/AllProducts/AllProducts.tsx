import { useEffect, useState } from "react";
import { ICategoria } from "../../../types/ICategoria";
import { Loader } from "../../ui/Loader/Loader";
import { ProductItem } from "../ProductItem/ProductItem";
import "./AllProducts.css";
import { IArticulo } from "../../../types/IArticulo";
import { Button } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

export const AllProducts = () => {
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticulos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/articulo/ventas`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setArticulos(data);
    } catch (error) {
      console.error("Error fetching articulos:", error);
    }
    setIsLoading(false);
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${API_URL}/categoria/ventas`);
      const data = await response.json();
      const formatedData = formatCategorias(data);
      setCategorias(formatedData);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  };

  const formatCategorias = (categoria: ICategoria[]) => {
    const categoriasData: ICategoria[] = [];
    const subCategorias: ICategoria[] = [];

    categoria.forEach((categoria) => {
      if (categoria.subCategorias.length > 0) {
        categoria.subCategorias.forEach((subCategoria) => {
          subCategorias.push(subCategoria);
        });
      }
    });
    categoria.forEach((categoria) => {
      if (
        !subCategorias.find((subCategoria) => subCategoria.id === categoria.id)
      ) {
        categoriasData.push(categoria);
        if (categoria.subCategorias.length > 0) {
          categoria.subCategorias.forEach((subCategoria) => {
            categoriasData.find((categoria) => {
              if (subCategoria.id === categoria.id) {
                categoria.subCategorias.push(subCategoria);
              }
            });
          });
        }
      }
    });
    return categoriasData;
  };

  useEffect(() => {
    fetchArticulos();
    fetchCategorias();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredArticulos = articulos
    .filter((articulo) => {
      const chosenCategory = categorias.find(
        (categoria) => categoria.id == Number(selectedCategory)
      );
      const isInSelectedCategory = chosenCategory
        ? articulo.categoria.id === chosenCategory.id ||
          (chosenCategory.subCategorias &&
            chosenCategory.subCategorias.some(
              (subCat) => subCat.id === articulo.categoria.id
            ))
        : true;
      const matchesSearchTerm = articulo.denominacion
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return isInSelectedCategory && matchesSearchTerm;
    })
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
        <div id="articulo" className="products-list-container">
          <h1 className="title">Todos los artículos</h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="sort-dropdown" style={{ marginRight: "1rem" }}>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                style={{ borderRadius: "0.5rem", padding: "0.5rem" }}>
                <option value="">Ordenar</option>
                <option
                  value="asc"
                  style={{ backgroundColor: "white", color: "black" }}>
                  Menor precio
                </option>
                <option
                  value="desc"
                  style={{ backgroundColor: "white", color: "black" }}>
                  Mayor precio
                </option>
              </select>
            </div>
          </div>
          <div className="category-buttons" style={{ marginRight: "1rem" }}>
            {categorias.map((categoria) => {
              return (
                <Button
                  key={categoria.id}
                  onClick={() => {
                    selectedCategory == categoria.id.toString()
                      ? setSelectedCategory("")
                      : setSelectedCategory(categoria.id.toString());
                  }}
                  color="error"
                  variant={
                    selectedCategory &&
                    selectedCategory == categoria.id.toString()
                      ? "contained"
                      : "outlined"
                  }>
                  {categoria.denominacion}
                </Button>
              );
            })}
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
