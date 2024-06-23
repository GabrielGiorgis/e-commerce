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

  const getUniqueKey = (item: ICartItem) => {
    return `${item.product.id}-${item.product.denominacion}`;
  };

  const addToCart = useCallback((product: ICartItem) => {
    setCart((prevCart) => {
      const exists = prevCart.some(
        (item) => getUniqueKey(item) === getUniqueKey(product)
      );

      console.log(`existe ${product.product.id}`, cart);
      if (exists) {
        return prevCart.map((item) =>
          getUniqueKey(item) === getUniqueKey(product)
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
      prevCart.filter((item) => getUniqueKey(item) !== getUniqueKey(product))
    );
  }, []);

  const decreaseAmount = useCallback((product: ICartItem) => {
    if (product.amount === 1) {
      removeItemFromCart(product);
    }
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          getUniqueKey(item) === getUniqueKey(product) && item.amount > 1
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
