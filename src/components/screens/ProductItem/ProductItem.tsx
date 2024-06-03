import React from "react";
import { IArticulo } from "../../../types/IArticulo";
import ModalProduct from "./ModalProduct";
import "./ProductItem.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import { IconButton } from "@mui/material";

interface IProductItem {
  product: IArticulo;
}
export const ProductItem = ({ product }: IProductItem) => {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <div className="card">
        <img
          className="card-img"
          src={product.imagenes[0].url}
          alt={product.imagenes[0].name}
        />
        <div className="card-info">
          <p className="text-title">{product.denominacion}</p>
          {/* <p className="text-body">{product.descripcion}</p> */}
          <p className="text-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            bibendum odio sed urna ornare varius. Donec sit amet nisi id tellus
            imperdiet cursus sed at lacus.
          </p>
        </div>
        <div className="card-footer">
          <span className="text-title">${product.precioVenta.toFixed(2)}</span>
          <IconButton>
            <DescriptionIcon
              className="card-button"
              onClick={() => setOpenModal(true)}
            />
          </IconButton>
          <IconButton>
            <ShoppingCartIcon className="card-button" />
          </IconButton>
        </div>
      </div>
      <ModalProduct
        product={product}
        openModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
      />
    </>
  );
};
