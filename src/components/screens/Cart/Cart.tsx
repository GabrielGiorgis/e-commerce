import {
  Alert,
  AlertTitle,
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Stack,
  Typography,
} from "@mui/material";
import { useCart } from "../../../hooks/useCart";
import { IArticuloCart } from "../../../types/IArticuloCart";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import { CheckoutMP } from "../../checkout/CheckoutMP";
import "./StyleSheets/StyleCart.css";
import React, { useEffect, useState } from "react";
import { IPedidoPost } from "../../../types/Pedido/IPedidoPost";
import { IDetallePedidoPost } from "../../../types/DetallePedido/IDetallePedidoPost";
import { PedidoService } from "../../../services/PedidoService";
import { useNavigate } from "react-router-dom";
import { CheckoutMp } from "./CheckoutMp";

const API_URL = import.meta.env.VITE_API_URL;
const pedidoService = new PedidoService(API_URL + "/pedido");

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
  const navigate = useNavigate();

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setEnvio(event.target.checked ? "TAKE_AWAY" : "DELIVERY");
  };

  const handleFormatPedido = ( products: IArticuloCart[]) => {
    const total = products.reduce(
      (total: number, product: IArticuloCart) => total + product.precioVenta,
      0
    );

    const detallesPedido: IDetallePedidoPost[] = cart.map((product) => ({
      cantidad: product.amount,
      subTotal: product.precioVenta * product.amount,
      idArticulo: product.id,
    }));

    const costo  = cart.map((products) => products.precioCompra * products.amount).reduce((total, item) => total + item, 0);
    //FORMATEO DE HORA ACTUAL
    const now = new Date();
    const future = new Date(now.getTime() + 30 * 60 * 1000);
    const hours = future.getHours().toString().padStart(2, '0');
    const minutes = future.getMinutes().toString().padStart(2, '0');
    const seconds = future.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const pedido: IPedidoPost = {
      horaEstimadaFinalizacion: formattedTime, //HORA FORMATEADA
      total: detallesPedido.reduce((total, item) => total + item.subTotal, 0),
      totalCosto: costo,
      estado: "PREPARACION",
      tipoEnvio: envio,
      formaPago: Pago,
      fechaPedido: new Date().toISOString(),
      idDomicilio: 1,
      idSucursal: 1,
      factura: {
        fechaFacturacion: new Date().toISOString(),
        totalVenta: total,
        mpPaymentId: 1,
        mpMerchantOrderId: 1,
        mpPreferenceId: "1",
        mpPaymentType: "1",
        formaPago: "MERCADO_PAGO",
      },
      idCliente: 1,
      idEmpleado: 1,
      detallePedidos: detallesPedido,
    };

    return pedido;
  };

  const handleCreate = async (products: IArticuloCart[]) => {
    const total = products.reduce(
      (total: number, product: IArticuloCart) => total + product.precioVenta,
      0
    );

    const detallesPedido: IDetallePedidoPost[] = cart.map((product) => ({
      cantidad: product.amount,
      subTotal: product.precioVenta * product.amount,
      idArticulo: product.id,
    }));

    const costo  = cart.map((products) => products.precioCompra * products.amount).reduce((total, item) => total + item, 0);
    //FORMATEO DE HORA ACTUAL
    const now = new Date();
    const future = new Date(now.getTime() + 30 * 60 * 1000);
    const hours = future.getHours().toString().padStart(2, '0');
    const minutes = future.getMinutes().toString().padStart(2, '0');
    const seconds = future.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const pedido: IPedidoPost = {
      horaEstimadaFinalizacion: formattedTime, //HORA FORMATEADA
      total: detallesPedido.reduce((total, item) => total + item.subTotal, 0),
      totalCosto: costo,
      estado: "PREPARACION",
      tipoEnvio: envio,
      formaPago: Pago,
      fechaPedido: new Date().toISOString(),
      idDomicilio: 1,
      idSucursal: 1,
      factura: {
        fechaFacturacion: new Date().toISOString(),
        totalVenta: total,
        mpPaymentId: 1,
        mpMerchantOrderId: 1,
        mpPreferenceId: "1",
        mpPaymentType: "1",
        formaPago: "MERCADO_PAGO",
      },
      idCliente: 1,
      idEmpleado: 1,
      detallePedidos: detallesPedido,
    };
    try {
      console.log(pedido);
      await pedidoService.post(pedido);
      setAlert({
        type: "success",
        message: "El pedido fue creado con exito.",
      });
      setTimeout(() => {
        navigate("/");
        cleanCart();
      }, 5000);
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: "Ocurrio un error al crear el pedido.",
      });
    }
  };

  const [envio, setEnvio] = useState<string>("DELIVERY");
  const [Pago, setPago] = useState<string>("EFECTIVO");
  const [alert, setAlert] = useState({ type: "", message: "" });

  return (
    <div className="cart-container">
      {alert.type && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity={alert.type === "success" ? "success" : "error"}>
            <AlertTitle>
              {alert.type === "success" ? "Pedido creado" : "Error"}
            </AlertTitle>
            {alert.message}
          </Alert>
        </Stack>
      )}
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <div>
              <label htmlFor="tipoEnvio">Tipo de envío:</label>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={envio === "TAKE_AWAY"}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={envio === "DELIVERY" ? "Delivery" : "Take away"}
                />
              </Box>
            </div>
            <div>
              <label htmlFor="formaPago">Forma de pago:</label>
              <select
                id="formaPago"
                name="formaPago"
                value={Pago}
                onChange={(e) => setPago(e.target.value)}>
                <option value="EFECTIVO">Efectivo</option>
                <option value="MERCADO_PAGO">Mercado pago</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => handleCreate(cart)}
            className="cart-button cart-button-solid">
            Crear pedido
          </button>
            <CheckoutMp 
            montoCarrito={cart.reduce((total, product) => total + product.precioVenta, 0)} 
            pedido={handleFormatPedido(cart)}
            setAlert={setAlert}
            cleanCart={cleanCart}
            />
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
