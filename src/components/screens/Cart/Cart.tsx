import { Alert, AlertTitle, Box, IconButton, Stack } from "@mui/material";
import { useCart } from "../../../hooks/useCart";
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
import { ICartItem } from "../../../types/Cart/ICartItem";
import { IArticulo } from "../../../types/IArticulo";
import { IPromocion } from "../../../types/IPromocion";
import { AlertSnackbar } from "../../ui/AlertSnackbar/AlertSnackbar";

const API_URL = import.meta.env.VITE_API_URL;
const pedidoService = new PedidoService(API_URL + "/pedido");

const verifyArticulo = (item: ICartItem) => {
  if ((item.product as IArticulo).precioVenta !== undefined) {
    return true;
  } else {
    return false;
  }
};

function CartItem({
  item,
  decreaseAmount,
  addToCart,
  removeItemFromCart,
}: {
  item: ICartItem;
  decreaseAmount: (item: ICartItem) => void;
  addToCart: (item: ICartItem) => void;
  removeItemFromCart: (item: ICartItem) => void;
}) {
  useEffect(() => {
    if (item.amount == 0) {
      decreaseAmount(item);
    }
  }, [item.amount]);
  return (
    <div className="cart-item" key={item.product.id}>
      {}
      <IconButton color="default" onClick={() => removeItemFromCart(item)}>
        <CloseIcon />
      </IconButton>
      <div className="cart-item-image">
        <img
          src={item.product.imagenes[0].url}
          alt={item.product.imagenes[0].name}
        />
      </div>
      <div className="cart-item-details">
        <div>
          <p className="cart-item-name">
            <strong>{item.product.denominacion}</strong>
          </p>
          {verifyArticulo(item) ? (
            <p className="cart-item-price">
              ${(item.product as IArticulo).precioVenta}
            </p>
          ) : (
            <p className="cart-item-price">
              ${(item.product as IPromocion).precioPromocional}
            </p>
          )}
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

  const handleFormatPedido = (products: ICartItem[]) => {
    const total = products.reduce(
      (total: number, product: ICartItem) =>
        total +
        (verifyArticulo(product)
          ? (product.product as IArticulo).precioVenta
          : (product.product as IPromocion).precioPromocional),
      0
    );

    const detallesPedido: IDetallePedidoPost[] = cart.map((product) => ({      cantidad: product.amount,
      subTotal: verifyArticulo(product)
        ? (product.product as IArticulo).precioVenta * product.amount
        : (product.product as IPromocion).precioPromocional * product.amount,
      idArticulo: verifyArticulo(product)
        ? (product.product as IArticulo).id
        : 0,
      idPromocion: verifyArticulo(product)
        ? 0
        : (product.product as IPromocion).id,
    }));

    const costo = cart
      .map((products) => {
        if (verifyArticulo(products)) {
          return (products.product as IArticulo).precioCompra * products.amount;
        } else {
          return (products.product as IPromocion).promocionDetalles.reduce(
            (total, detalle) =>
              total + detalle.articulo.precioCompra * products.amount,
            0
          );
        }
      })
      .reduce((total, item) => total + item, 0);
    //FORMATEO DE HORA ACTUAL
    const now = new Date();
    const future = new Date(now.getTime() + 30 * 60 * 1000);
    const hours = future.getHours().toString().padStart(2, "0");
    const minutes = future.getMinutes().toString().padStart(2, "0");
    const seconds = future.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const pedido: IPedidoPost = {
      horaEstimadaFinalizacion: formattedTime, //HORA FORMATEADA
      total: detallesPedido.reduce((total, item) => total + item.subTotal, 0),
      totalCosto: costo,
      estado: "PENDIENTE",
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

  const handleCreate = async (products: ICartItem[]) => {
    const total = products.reduce(
      (total: number, product: ICartItem) =>
        total +
        (verifyArticulo(product)
          ? (product.product as IArticulo).precioVenta
          : (product.product as IPromocion).precioPromocional),
      0
    );

    const detallesPedido: IDetallePedidoPost[] = cart.map((product) => ({
      cantidad: product.amount,
      subTotal: verifyArticulo(product)
        ? (product.product as IArticulo).precioVenta * product.amount
        : (product.product as IPromocion).precioPromocional * product.amount,
      idArticulo: verifyArticulo(product)
        ? (product.product as IArticulo).id
        : 0,
      idPromocion: verifyArticulo(product)
        ? 0
        : (product.product as IPromocion).id,
    }));

    const costo = cart
      .map((products) => {
        if (verifyArticulo(products)) {
          return (products.product as IArticulo).precioCompra * products.amount;
        } else {
          return (products.product as IPromocion).promocionDetalles.reduce(
            (total, detalle) =>
              total + detalle.articulo.precioCompra * products.amount,
            0
          );
        }
      })
      .reduce((total, item) => total + item, 0);
    //FORMATEO DE HORA ACTUAL
    const now = new Date();
    const future = new Date(now.getTime() + 30 * 60 * 1000);
    const hours = future.getHours().toString().padStart(2, "0");
    const minutes = future.getMinutes().toString().padStart(2, "0");
    const seconds = future.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const pedido: IPedidoPost = {
      horaEstimadaFinalizacion: formattedTime, //HORA FORMATEADA
      total: detallesPedido.reduce((total, item) => total + item.subTotal, 0),
      totalCosto: costo,
      estado: "PENDIENTE",
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
      if (pedido.estado === "RECHAZADO") {
        setAlert({
          message:
            "Su pedido fue rechazado por falta de insumos, sepa disculpar.",
          severity: "error",
        });
      } else {
        setAlert({
          message: "Su pedido fue creado con éxito.",
          severity: "success",
        });
        setTimeout(() => {
          navigate("/");
          cleanCart();
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      setAlert({
        message: "Ocurrio un error al crear su pedido.",
        severity: "error",
      });
    }
  };

  const [envio, setEnvio] = useState<string>("DELIVERY");
  const [Pago, setPago] = useState<string>("EFECTIVO");
  const [alert, setAlert] = useState({ message: "", severity: "" });

  return (
    <div className="cart-container">
      <AlertSnackbar message={alert.message} severity={alert.severity} />
      {cart.length > 0 ? (
        <>
          <div className="cart-header">
            <h2>Carrito</h2>
            <button onClick={cleanCart} className="cart-button">
              Limpiar carrito
            </button>
          </div>
          <ul className="cart-item-list">
            {cart.map(
              (item: ICartItem, index: number) =>
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
          <div className="cart-footer">
            <div>
              <label htmlFor="tipoEnvio">Tipo de envío:</label>
              <select
                id="tipoEnvio"
                value={envio}
                onChange={(e) => setEnvio(e.target.value)}
              >
                <option value="DELIVERY">Delivery</option>
                <option value="TAKE_AWAY">Take away</option>
              </select>
            </div>
            <div>
              <label htmlFor="formaPago">Forma de pago:</label>
              <select
                id="formaPago"
                name="formaPago"
                value={Pago}
                onChange={(e) => setPago(e.target.value)}
              >
                {envio === "DELIVERY" ? (
                  <option value="MERCADO_PAGO">Mercado pago</option>
                ) : (
                  <>
                    <option value="EFECTIVO">Efectivo</option>
                    <option value="MERCADO_PAGO">Mercado pago</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="cart-footer">
            <button className="crear-pedido" onClick={() => handleCreate(cart)}>
              Crear pedido
            </button>
            {Pago === "MERCADO_PAGO" || envio === "DELIVERY" ? (
              <div>
                <CheckoutMp
                  montoCarrito={cart.reduce(
                    (total, product) =>
                      total +
                      (verifyArticulo(product)
                        ? (product.product as IArticulo).precioVenta
                        : (product.product as IPromocion).precioPromocional),
                    0
                  )}
                  pedido={handleFormatPedido(cart)}
                  //setAlert={setAlert}
                  //cleanCart={cleanCart}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <h2>Carrito</h2>
          <div className="cart-empty-container">
            <RemoveShoppingCartIcon style={{ fontSize: "60px" }} />
            <p>No hay elementos en el carrito</p>
          </div>
        </>
      )}
    </div>
  );
}
