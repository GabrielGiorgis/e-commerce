import { useEffect, useState } from "react";
import { IArticuloCart } from "../../../types/IArticuloCart";
import { IPromocion } from "../../../types/IPromocion";
import { useCart } from "../../../hooks/useCart";
import { LoadingButton } from "@mui/lab";

interface SaleItemProps {
    promocion: IPromocion;
}

export const SaleItem = ({ promocion }: SaleItemProps) => {
    const { cart, addToCart, decreaseAmount, removeItemFromCart } = useCart();
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<IArticuloCart[]>(
        promocion.promocionDetalles.map((detalle) => {
            const item = cart.find((item: IArticuloCart) => item.id === detalle.articulo.id);
            return item ? item : { ...detalle.articulo, amount: 0, suma: detalle.cantidad };
        })
    );

    useEffect(() => {
        items.map((item) => {
            if (item.amount == 0) {
                removeItemFromCart(item);
            }
        })
    }, [items]
    );
    useEffect(() => {

        verifyEliminado();
    }, []);
    const verifyEliminado = () => {
        promocion.promocionDetalles.forEach(detalle => {
            if (detalle.articulo.eliminado) {
                setDisabled(true)
            }
            detalle.articulo.articuloManufacturadoDetalles?.forEach(detalle => {
                if (detalle.articuloInsumo.eliminado) {
                    setDisabled(true)
                }
            });
        })

    }

    return (
        <div className="card" style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}>
            <div className="card-img">
                <img
                    src={promocion.imagenes[0].url}
                    alt={promocion.denominacion}
                />
            </div>
            <div className="card-body">
                <h3>{promocion.denominacion}</h3>
            </div>
            <div className="card-footer" style={{ display: "flex", flexDirection: "column" }}>
                <span className="text-title">${promocion.precioPromocional.toFixed(2)}</span>
                <span className="text-body">Válida hasta el {promocion.fechaHasta}</span>
                {promocion.promocionDetalles.map((detalle, index) => (
                    <span className="text-body" key={index}>{detalle.articulo.denominacion} - {detalle.cantidad}</span>
                ))}
            </div>
            <LoadingButton
                loading={loading}
                onClick={()=>{
                    setLoading(true)
                    setItems((prevItems) => [...prevItems, ...items])
                    setLoading(false)
                }}
                >
            <button onClick={() => items.map((item) => addToCart(item, item.suma))} className="btn btn-secondary" >¡Agregar al carrito!</button>
            </LoadingButton>
        </div>
    );
}