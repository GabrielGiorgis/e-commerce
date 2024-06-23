import React, { useEffect, useLayoutEffect, useState } from "react";
import { IPromocion } from "../../../types/IPromocion";
import { useCart } from "../../../hooks/useCart";
import { LoadingButton } from "@mui/lab";
import { ICartItem } from "../../../types/Cart/ICartItem";
import DescriptionIcon from "@mui/icons-material/Description";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalProduct from "../../ui/modals/modalProducts/ModalProduct";

interface SaleItemProps {
  promocion: IPromocion;
}

export const SaleItem = ({ promocion }: SaleItemProps) => {
  const { cart, addToCart, decreaseAmount, removeItemFromCart } = useCart();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<ICartItem>(
    cart.find((item: ICartItem) => item.product.id === promocion.id) || {
      product: promocion,
      amount: 0,
    }
  );

  const [openModal, setOpenModal] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (item.amount === 0) {
      removeItemFromCart(item);
    }
  }, [item.amount, removeItemFromCart]);

  useEffect(() => {
    verifyEliminado();
  }, []);

  const verifyEliminado = () => {
    promocion.promocionDetalles.forEach((detalle) => {
      if (detalle.articulo.eliminado) {
        setDisabled(true);
      }
      detalle.articulo.articuloManufacturadoDetalles?.forEach((detalle) => {
        if (detalle.articuloInsumo.eliminado) {
          setDisabled(true);
        }
      });
    });
  };

  return (
    <>
      <div
        className="card"
        style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
        <div className="top-card-container">
          <div className="card-img">
            <img src={promocion.imagenes[0].url} alt={promocion.denominacion} />
          </div>
          <div className="card-info">
            <h3 className="text-title">{promocion.denominacion}</h3>
          </div>
        </div>
        <div
          className="card-footer"
          style={{ display: "flex", flexDirection: "column" }}>
          {/* <span className="text-title">
            ${promocion.precioPromocional.toFixed(2)}
          </span> */}
          <span className="text-body">
            Válida hasta el {promocion.fechaHasta}
          </span>
        </div>
        <div className="card-footer">
          <span className="text-title">
            ${promocion.precioPromocional.toFixed(2)}
          </span>
          <IconButton onClick={() => setOpenModal(true)}>
            <DescriptionIcon className="card-button" />
          </IconButton>
          {cart.find(
            (item: ICartItem) =>
              item.product.denominacion === promocion.denominacion &&
              item.product.id === promocion.id
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
                  addToCart({ product: promocion, amount: 1 });
                  setItem({ product: promocion, amount: 1 });
                  setLoading(false);
                }, 1500);
              }}>
              <ShoppingCartIcon className="card-button" />
            </LoadingButton>
          )}
        </div>
      </div>
      <ModalProduct
        product={promocion}
        openModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
      />
    </>
  );
};
