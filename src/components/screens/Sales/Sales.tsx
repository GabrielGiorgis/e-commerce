import { useEffect, useState } from "react";
import { PromocionService } from "../../../services/PromocionService";
import { IPromocion } from "../../../types/IPromocion";
import { Loader } from "../../ui/Loader/Loader";
import { SaleItem } from "./SaleItem";

const API_URL = import.meta.env.VITE_API_URL;

export const Sales = () => {
    const promocionesService = new PromocionService(API_URL + "/promocion");
    const [promociones, setPromociones] = useState<IPromocion[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getPromociones = async () => {
        setIsLoading(true);
        const promociones = await promocionesService.getAll();
        setPromociones(promociones);
        setIsLoading(false);
    };

    useEffect(() => {
        getPromociones();
    }, []);

    return( <>
    {isLoading ? (
      <Loader />
    ) : (
      <div className="products-list-container">
        <h1 className="title">Promociones</h1>
        <ul className="products-list">
          {promociones.map((promocion, index) => (
            <SaleItem promocion={promocion}/>
          ))}
        </ul>
      </div>
    )}
  </>
    )
}