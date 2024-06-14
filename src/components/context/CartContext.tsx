import { ReactNode, createContext, useState } from "react";
import { IArticuloCart } from "../../types/IArticuloCart";

interface CartContextType {
  cart: IArticuloCart[];
  addToCart: (product: IArticuloCart, suma?: number) => void;
  removeItemFromCart: (product: IArticuloCart) => void;
  decreaseAmount: (product: IArticuloCart) => void;
  cleanCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeItemFromCart: () => {},
  decreaseAmount: () => {},
  cleanCart: () => {},
});

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<IArticuloCart[]>([]);

  const addToCart = async (product: IArticuloCart, suma?: number) => {
    let existe: boolean = false;
    cart.forEach((element: IArticuloCart) => {
      if (element.id === product.id) {
        existe = true;
        return;
      }
    });
    if (existe) {
      console.log("El articulo ya se encuentra en el carrito.");
      if (suma) {
        product.amount += suma;
      } else {
        product.amount += 1;
      }
      const cartClonado = structuredClone(
        cart.filter((item) => item.id !== product.id)
      );
      cartClonado.push(product);
      setCart(cartClonado);
    } else {
      console.log("NO EXISTE");
      if (suma) {
        product.amount = suma;
      } else {
        product.amount = 1;
      }
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeItemFromCart = async (product: IArticuloCart) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== product.id)
    );
  };

  const decreaseAmount = async (product: IArticuloCart) => {
    let existe: boolean = false;
    cart.forEach((element: IArticuloCart) => {
      if (element.id === product.id) {
        existe = true;
        return;
      }
    });
    if (existe) {
      if (product.amount >= 1) {
        product.amount -= 1;
        const cartClonado = structuredClone(
          cart.filter((item) => item.id !== product.id)
        );
        cartClonado.push(product);
        setCart(cartClonado);
      }
    }
  };

  const cleanCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItemFromCart,
        decreaseAmount,
        cleanCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}
