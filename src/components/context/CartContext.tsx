import { ReactNode, createContext, useState } from "react";
import { IArticuloCart } from "../../types/IArticuloCart";

interface CartContextType {
  cart: IArticuloCart[];
  addToCart: (product: IArticuloCart) => void;
  removeItemFromCart: (product: IArticuloCart) => void;
  decreaseAmount: (product: IArticuloCart) => void;
  cleanCart: () => void;
}
//Determinar el constexto del carrito
export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeItemFromCart: () => {},
  decreaseAmount: () => {},
  cleanCart: () => {},
});
//Proveer el contexto del carrito
export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<IArticuloCart[]>([]);

  const addToCart = async (product: IArticuloCart) => {
    let existe: boolean = false;
    cart.forEach(async (element: IArticuloCart) => {
      if (element.id === product.id) {
        existe = true;
        return existe;
      }
    });
    if (existe) {
      console.log("El articulo ya se encuentra en el carrito. ");
      product.amount += 1;
      const cartClonado = await structuredClone(
        cart.filter((item) => item.id !== product.id)
      ); //revisar el filter que hace, para que haga unupdate, n unppush
      await cartClonado.push(product);
      setCart(cartClonado);
    } else {
      console.log("NO EXISTE");
      product.amount = 1;
      await setCart((prevCart) => [...prevCart, product]);
    }
  };
  const removeItemFromCart = async (product: IArticuloCart) => {
    await setCart((prevCart) =>
      prevCart.filter((item) => item.id !== product.id)
    );
  };
  const decreaseAmount = async (product: IArticuloCart) => {
    let existe: boolean = false;
    cart.forEach(async (element: IArticuloCart) => {
      if (element.id === product.id) {
        existe = true;
        return existe;
      }
    });
    if (existe) {
      if (product.amount >= 1) {
        product.amount -= 1;
        const cartClonado = await structuredClone(
          cart.filter((item) => item.id !== product.id)
        );
        await cartClonado.push(product);
        setCart(cartClonado);
      }
    }
  };
  const cleanCart = async () => {
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
