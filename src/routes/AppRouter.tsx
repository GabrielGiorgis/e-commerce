import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/Home/Home";
import ProductsList from "../components/screens/ProductsList/ProductsList";
import Header from "../components/ui/Bars/Header/Header";
import { Footer } from "../components/ui/Bars/Footer/Footer";
import { Cart } from "../components/screens/Cart/Cart";
import { CartContextProvider } from "../components/context/CartContext";

export const AppRouter = () => {
  return (
    <>
      <CartContextProvider>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:id/articulos" element={<ProductsList />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </div>
      </CartContextProvider>
      <Footer />
    </>
  );
};
