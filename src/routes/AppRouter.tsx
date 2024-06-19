import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/Home/Home";
import ProductsList from "../components/screens/ProductsList/ProductsList";
import Header from "../components/ui/Bars/Header/Header";
import { Footer } from "../components/ui/Bars/Footer/Footer";
import { Cart } from "../components/screens/Cart/Cart";
import { CartContextProvider } from "../components/context/CartContext";
import "./AppRouter.css";
import { LoginClient } from "../components/screens/UserCLient/LoginClient";
import { RutaPrivada } from "../components/screens/UserCLient/RutaPrivada";
import Sucursales from "../components/screens/Sucursales/Sucursales";

export const AppRouter = () => {
  return (
    <>
      <CartContextProvider>
        <div id="root">
          
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginClient />} />
              <Route path="/" element={<RutaPrivada><Home /></RutaPrivada>} />
              <Route
                path="/categoria/:id/articulos"
                element={<RutaPrivada><ProductsList /></RutaPrivada>}
              />
              <Route path="/carrito" element={<RutaPrivada><Cart /></RutaPrivada>} />
              <Route path="/sucursales" element={<Sucursales />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartContextProvider>
    </>
  );
};
