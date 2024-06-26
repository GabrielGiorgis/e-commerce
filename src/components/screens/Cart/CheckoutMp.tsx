import { useEffect, useState } from "react";
import { createPreferenceMP } from "../../../services/MpService";
import { IPedidoPost } from "../../../types/Pedido/IPedidoPost";
import PreferenceMP from "../../../types/IPreferenceMP";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import "./StyleSheets/StyleCheckoutMp.css";
import { useNavigate } from "react-router-dom";
import { ISucursalShort } from "../../../types/ISucursalShort";
import { SucursalService } from "../../../services/SucursalService";
import { AlertSnackbar } from "../../ui/AlertSnackbar/AlertSnackbar";
import { AlertColor } from "@mui/material";

interface CheckoutMpProps {
  montoCarrito: number;
  pedido: IPedidoPost;
}
export function CheckoutMp({ montoCarrito, pedido }: CheckoutMpProps) {
  const [idPreference, setIdPreference] = useState<string>("");

  const [selectedSucursal, setSelectedSucursal] = useState<ISucursalShort>();
  const [isSucursalOpen, setIsSucursalOpen] = useState<boolean>(false);

  const [alert, setAlert] = useState<{ message: string; severity: AlertColor }>(
    {
      message: "",
      severity: "",
    }
  );

  const API_URL = import.meta.env.VITE_API_URL;
  const sucursalService = new SucursalService(API_URL + "/sucursal");
  const navigate = useNavigate();

  const checkSucursalOpen = () => {
    if (selectedSucursal) {
      const [horaApertura, minutoApertura, segundoApertura] =
        selectedSucursal.horarioApertura.split(":");
      const [horaCierre, minutoCierre, segundoCierre] =
        selectedSucursal.horarioCierre.split(":");
      const now = new Date();
      const apertura = new Date(now);
      apertura.setHours(
        Number(horaApertura),
        Number(minutoApertura),
        Number(segundoApertura)
      );
      const cierre = new Date(now);
      cierre.setHours(
        Number(horaCierre),
        Number(minutoCierre),
        Number(segundoCierre)
      );

      const isItOpen = apertura <= new Date() && cierre >= new Date();
      setIsSucursalOpen(isItOpen);
    }
  };
  const getPreferenceMP = async () => {
    checkSucursalOpen();
    if (!isSucursalOpen) {
      return setAlert({
        message:
          "En este momento nuestra sucursal se encuentra cerrada. Por favor, vuelva pronto.",
        severity: "error",
      });
    }
    if (!localStorage.getItem("idUser")) {
      return navigate("/login");
    }
    if (montoCarrito > 0) {
      const response: PreferenceMP = await createPreferenceMP(pedido);
      if (response) setIdPreference(response.id);
    } else {
      setAlert({
        message: "No hay productos en el carrito",
        severity: "error",
      });
    }
  };
  initMercadoPago("TEST-7e08b627-fbf4-4888-acf4-a0c7436a26a1", {
    locale: "es-AR",
  });

  useEffect(() => {
    const getSelectedSucursal = async () => {
      const idSucursal = 1;
      if (idSucursal) {
        const sucursal = await sucursalService.getById(Number(idSucursal));
        if (sucursal) setSelectedSucursal(sucursal);
      }
    };
    getSelectedSucursal();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAlert({ message: "", severity: "info" });
    }, 5000);
  }, [alert]);
  return (
    <div>
      <AlertSnackbar message={alert.message} severity={alert.severity} />
      <button className="btn mercado-pago-button" onClick={getPreferenceMP}>
        Pagar con Mercado Pago
      </button>
      {idPreference && (
        <div>
          <Wallet
            initialization={{
              preferenceId: idPreference,
              redirectMode: "blank",
            }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        </div>
      )}
    </div>
  );
}
