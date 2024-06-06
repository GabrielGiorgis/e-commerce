import { useContext } from "react";
import { CartContext } from "../components/context/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error(
      "useCarrito debe ser usado dentro del ambito de un CartProvider"
    );
  }
  return context;
};
