import { ReactNode, createContext, useState } from "react";
import { IArticuloCart } from "../../types/IArticuloCart";
import { IPromocion } from "../../types/IPromocion";
import { ICartItem } from "../../types/Cart/ICartItem";

interface CartContextType {
  cart: ICartItem[];
  addToCart: (product: ICartItem) => void;
  removeItemFromCart: (product: ICartItem) => void;
  decreaseAmount: (product: ICartItem) => void;
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
  const [cart, setCart] = useState<ICartItem[]>([]);

  const addToCart = async (product: ICartItem) => {
    let existe: boolean = false;
    cart.forEach((element: ICartItem) => {
      if (element.product.id === product.product.id) {
        existe = true;
        return;
      }
    });
    if (existe) {
      console.log("El articulo ya se encuentra en el carrito.");
      product.amount += 1;
      const cartClonado = structuredClone(
        cart.filter((item) => item.product.id !== product.product.id)
      );
      cartClonado.push(product);
      setCart(cartClonado);
    } else {
      console.log("NO EXISTE");
      product.amount = 1;
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  const removeItemFromCart = async (product: ICartItem) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== product.product.id)
    );
  };

  const decreaseAmount = async (product: ICartItem) => {
    let existe: boolean = false;
    cart.forEach((element: ICartItem) => {
      if (element.product.id === product.product.id) {
        existe = true;
        return;
      }
    });
    if (existe) {
      if (product.amount >= 1) {
        product.amount -= 1;
        const cartClonado = structuredClone(
          cart.filter((item) => item.product.id !== product.product.id)
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
