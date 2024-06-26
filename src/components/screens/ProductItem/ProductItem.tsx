import React, { useEffect, useState } from "react";
import { IArticulo } from "../../../types/IArticulo";
import ModalProduct from "../../ui/modals/modalProducts/ModalProduct";
import "./ProductItem.css";
import { LoadingButton } from "@mui/lab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";
import { useCart } from "../../../hooks/useCart";
import { ICartItem } from "../../../types/Cart/ICartItem";
import { useNavigate } from "react-router-dom";

interface IProductItem {
  product: IArticulo;
}
export const ProductItem = ({ product }: IProductItem) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const { cart, addToCart, decreaseAmount, removeItemFromCart } = useCart();
  const [item, setItem] = useState<ICartItem>(
    cart.find((item: ICartItem) => item.product.id === product.id) || {
      product: product,
      amount: 0,
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (item.amount == 0) {
      removeItemFromCart(item);
    }
  }, [item.amount]);

  useEffect(() => {
    verifyEliminado();
  }, []);

  const verifyEliminado = () => {
    if (product.eliminado) {
      setDisabled(true);
    }
    product.articuloManufacturadoDetalles?.forEach((detalle) => {
      if (detalle.articuloInsumo.eliminado) {
        setDisabled(true);
      }
    });
  };

  return (
    <>
      <div className={disabled ? "card card-disabled" : "card"}>
        <div className="top-card-container">
          <div className="card-img">
            <img src={product.imagenes[0].url} alt={product.imagenes[0].name} />
          </div>
          <div className="card-info">
            <p className="text-title">{product.denominacion}</p>
          </div>
        </div>
        <div className="card-footer">
          <span className="text-title">${product.precioVenta.toFixed(2)}</span>
          <IconButton onClick={() => setOpenModal(true)}>
            <DescriptionIcon className="card-button" />
          </IconButton>
          {cart.find(
            (item: ICartItem) =>
              item.product.denominacion === product.denominacion &&
              item.product.id === product.id
          ) ? (
            <Box display="flex" gap="0" alignItems="center">
              <IconButton
                key={item.product.id}
                onClick={() => {
                  setItem({ ...item, amount: item.amount - 1 });
                  decreaseAmount(item);
                }}
                color="error">
                <RemoveIcon />
              </IconButton>
              <input
                className="amount"
                min="0"
                type="number"
                value={item.amount}
                readOnly
              />
              <IconButton
                onClick={() => {
                  setItem({ ...item, amount: item.amount + 1 });
                  addToCart(item);
                }}
                color="error">
                <AddIcon />
              </IconButton>
            </Box>
          ) : (
            <LoadingButton
              size="small"
              loading={loading}
              variant="outlined"
              color="error"
              onClick={() => {
                if (!localStorage.getItem("idUser")) {
                  return navigate("/login");
                }
                setLoading(true);
                setTimeout(() => {
                  addToCart({ product: product, amount: 1 });
                  setItem({ product: product, amount: 1 });
                  setLoading(false);
                }, 1500);
              }}>
              <ShoppingCartIcon className="card-button" />
            </LoadingButton>
          )}
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
