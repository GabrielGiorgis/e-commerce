import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/Home/Home";
import Header from "../components/ui/Bars/Header/Header";
import { Footer } from "../components/ui/Bars/Footer/Footer";
import { Cart } from "../components/screens/Cart/Cart";
import { CartContextProvider } from "../components/context/CartContext";
import "./AppRouter.css";
import { LoginClient } from "../components/screens/UserCLient/LoginClient";
import { RutaPrivada } from "../components/screens/UserCLient/RutaPrivada";
import HistorialPedidos from "../components/screens/Pedidos/HistorialPedidos";
import { Profile } from "../components/screens/Profile/Profile";
import { RegisterClient } from "../components/screens/UserCLient/RegisterClient";

export const AppRouter = () => {
  return (
    <>
      <CartContextProvider>
        <div id="root">
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginClient />} />
              <Route path="/register" element={<RegisterClient />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/carrito"
                element={
                  <RutaPrivada>
                    <Cart />
                  </RutaPrivada>
                }
              />
              <Route
                path="/profile"
                element={
                  <RutaPrivada>
                    <Profile />
                  </RutaPrivada>
                }
              />
              <Route
                path="/pedidos"
                element={
                  <RutaPrivada>
                    <HistorialPedidos />
                  </RutaPrivada>
                }
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartContextProvider>
    </>
  );
};
