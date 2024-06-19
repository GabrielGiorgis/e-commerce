import { useEffect, useState } from "react";
import { createPreferenceMP } from "../../../services/MpService";
import { IPedidoPost } from "../../../types/Pedido/IPedidoPost";
import PreferenceMP from "../../../types/IPreferenceMP";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import "./StyleSheets/StyleCheckoutMp.css";

interface CheckoutMpProps {
    montoCarrito: number
    pedido: IPedidoPost
}
export function CheckoutMp({ montoCarrito, pedido }: CheckoutMpProps) {
    const [idPreference, setIdPreference] = useState<string>("");

    const getPreferenceMP = async () => {
        if (montoCarrito > 0) {
            const response: PreferenceMP = await createPreferenceMP(pedido);
            if (response)
                setIdPreference(response.id);
        } else {
            alert("No hay productos en el carrito");
        }
    };
    initMercadoPago('TEST-7e08b627-fbf4-4888-acf4-a0c7436a26a1', { locale: 'es-AR' });

    return (
        <div>
            <button
                className="btn mercado-pago-button"
                onClick={getPreferenceMP}
            >Pagar con Mercado Pago
            </button>
            {idPreference &&
                <div>
                    <Wallet initialization={{ preferenceId: idPreference, redirectMode: 'blank' }} customization={{ texts: { valueProp: 'smart_option' } }} />

                </div>
            }

        </div>
    );


}
