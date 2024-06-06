import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
// import { createPreferenceMP } from "../api/useMp";
import PreferenceMP from "../../types/IPreferenceMP";
import "./StyleSheets/StyleCheckout.css";
import { IPedido } from "../../types/Pedido/IPedidoPost";
initMercadoPago("");

async function createPreferenceMP(pedido?: IPedido) {
  const urlServer = "http://localhost:8080/api/pedidos/create_preference_mp"; //TODO: Revisar si la url está bien
  const method: string = "POST";
  const response = await fetch(urlServer, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  });
  const data = await response.json();
  return data;
}

export function CheckoutMP({ montoCarrito = 0 }) {
  const [idPreference, setIdPreference] = useState<string>("");

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      //     const response: PreferenceMP = await createPreferenceMP({ idPedido: 0, titulo: "Pedido de instrumentos", fechaPedido: new Date(), totalPedido: montoCarrito });
      //     console.log("Preference id: " + response.id);
      //     if (response)
      //         setIdPreference(response.id);
      // } else {
      //     alert("No hay instrumentos en el carrito");
    }
  };
  initMercadoPago("TEST-7e08b627-fbf4-4888-acf4-a0c7436a26a1", {
    locale: "es-AR",
  });
  return (
    <div>
      <button
        onClick={getPreferenceMP}
        className="btn btn-primary"
        style={{ display: "block", margin: "auto" }}>
        Pagar con <br />
        Mercado Pago
      </button>
      <div className={idPreference ? "divVisible" : "divInvisible"}>
        <Wallet
          initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </div>
  );
}
