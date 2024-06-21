import { useEffect, useLayoutEffect, useState } from "react";
import { IPromocion } from "../../../types/IPromocion";
import { useCart } from "../../../hooks/useCart";
import { LoadingButton } from "@mui/lab";
import { ICartItem } from "../../../types/Cart/ICartItem";

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

  useLayoutEffect(() => {
    console.log(promocion);
  });

  useEffect(() => {
    if (item.amount === 0) {
      removeItemFromCart(item);
    }
  }, [item.amount, removeItemFromCart]);

  useEffect(() => {
    console.log(promocion);
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
    <div
      className="card"
      style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
      <div className="card-img">
        <img src={promocion.imagenes[0].url} alt={promocion.denominacion} />
      </div>
      <div className="card-body">
        <h3>{promocion.denominacion}</h3>
      </div>
      <div
        className="card-footer"
        style={{ display: "flex", flexDirection: "column" }}>
        <span className="text-title">
          ${promocion.precioPromocional.toFixed(2)}
        </span>
        <span className="text-body">
          Válida hasta el {promocion.fechaHasta}
        </span>
        {promocion.promocionDetalles.map((detalle, index) => (
          <span className="text-body" key={index}>
            {detalle.articulo.denominacion} - {detalle.cantidad}
          </span>
        ))}
      </div>
      <LoadingButton
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            addToCart(item);
            setItem((prevItem) => ({
              ...prevItem,
              amount: prevItem.amount + 1,
            }));
            setLoading(false);
          }, 1000);
        }}>
        ¡Agregar al carrito!
      </LoadingButton>
    </div>
  );
};
