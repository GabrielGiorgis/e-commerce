import { ReactNode, createContext, useState, useCallback } from "react";
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

  const addToCart = useCallback((product: ICartItem) => {
    setCart((prevCart) => {
      const exists = prevCart.some(
        (item) => item.product.id === product.product.id
      );

      if (exists) {
        return prevCart.map((item) =>
          item.product.id === product.product.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, amount: 1 }];
      }
    });
  }, []);

  const removeItemFromCart = useCallback((product: ICartItem) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== product.product.id)
    );
  }, []);

  const decreaseAmount = useCallback((product: ICartItem) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === product.product.id && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        )
        .filter((item) => item.amount > 0)
    );
  }, []);

  const cleanCart = useCallback(() => {
    setCart([]);
  }, []);

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
