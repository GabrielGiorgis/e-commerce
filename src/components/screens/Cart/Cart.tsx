import { Box, IconButton } from "@mui/material";
import { useCart } from "../../../hooks/useCart";
import { IArticuloCart } from "../../../types/IArticuloCart";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { CheckoutMP } from "../../checkout/CheckoutMP";
import "./StyleSheets/StyleCart.css";
import React, { useEffect, useState } from "react";
import { IPedidoPost } from "../../../types/Pedido/IPedidoPost";

function CartItem({
  item,
  decreaseAmount,
  addToCart,
  removeItemFromCart,
}: {
  item: IArticuloCart;
  decreaseAmount: (item: IArticuloCart) => void;
  addToCart: (item: IArticuloCart) => void;
  removeItemFromCart: (item: IArticuloCart) => void;
}) {
  useEffect(() => {
    if (item.amount == 0) {
      decreaseAmount(item);
    }
  }, [item.amount]);

  return (
    <div className="cart-item" key={item.id}>
      {}
      <IconButton color="default" onClick={() => removeItemFromCart(item)}>
        <CloseIcon />
      </IconButton>
      <div className="cart-item-image">
        <img src={item.imagenes[0].url} alt={item.imagenes[0].name} />
      </div>
      <div className="cart-item-details">
        <div>
          <p className="cart-item-name">
            <strong>{item.denominacion}</strong>
          </p>
          <p className="cart-item-price">${item.precioVenta}</p>
        </div>
        <Box display="flex" gap="0" alignItems="center">
          <IconButton onClick={() => decreaseAmount(item)} color="error">
            <RemoveIcon />
          </IconButton>
          <input className="amount" min="0" type="number" value={item.amount} />
          <IconButton onClick={() => addToCart(item)} color="error">
            <AddIcon />
          </IconButton>
        </Box>
      </div>
    </div>
  );
}

export function Cart() {
  const { cart, addToCart, decreaseAmount, removeItemFromCart, cleanCart } =
    useCart();

  const handleCreate = async (products: IArticuloCart[]) => {
    const total = products.reduce(
      //TODO: Esto no está bien, preguntar que tipo de dato va acá
      (total: number, product: IArticuloCart) => total + product.precioVenta,
      0
    );

    const pedido: IPedidoPost = {
      horaEstimadaFinalizacion: new Date().toISOString(),
      total: total,
      totalCosto: total,
      estado: "PREPARACION",
      tipoEnvio: "DELIVERY",
      formaPago: "MERCADO_PAGO",
      fechaPedido: new Date().toISOString(),
      domicilio: {
        calle: "Calle falsa 123",
        localidad: "Springfield",
        provincia: "Springfield",
        pais: "USA",
        codigoPostal: "1234",
      },
      idSucursal: 1,
      factura: {
        id: 1,
        fechaFacturacion: new Date().toISOString(),
        totalVenta: total,
        mpPaymentId: 1,
        mpMerchantOrderId: 1,
        mpPreferenceId: "1",
        mpPaymentType: "1",
        formaPago: "MERCADO_PAGO",
      },
      idCliente: 1,
      // detallePedido
    };

    const detallesPedido = products.map((product) => ({
      cantidad: product.amount,
      articulo: product,
      pedido: pedido,
    }));

    console.log(detallesPedido);
    try {
      for (const detalle of detallesPedido) {
      }
      cleanCart();
      alert("Se ha creado el pedido con éxito.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart-container">
      {cart.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <h2>Carrito</h2>

            <button
              onClick={cleanCart}
              className="cart-button cart-button-border">
              Limpiar carrito
            </button>
          </div>
          <ul className="cart-item-list">
            {cart.map(
              (item: IArticuloCart, index: number) =>
                item.amount > 0 && (
                  <CartItem
                    key={index}
                    item={item}
                    addToCart={addToCart}
                    decreaseAmount={decreaseAmount}
                    removeItemFromCart={removeItemFromCart}
                  />
                )
            )}
          </ul>
          <button
            onClick={() => handleCreate(cart)}
            className="cart-button cart-button-solid">
            Crear pedido
          </button>
          {/* <CheckoutMP montoCarrito={cart.reduce((total, product) => total + product.precioVenta, 0)} /> */}
        </>
      ) : (
        <>
          <h2>Carrito</h2>
          <div
            style={{
              display: "flex",
              width: "100vw",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <RemoveShoppingCartIcon style={{ fontSize: "60px" }} />
            <p>No hay elementos en el carrito</p>
          </div>
        </>
      )}
    </div>
  );
}
