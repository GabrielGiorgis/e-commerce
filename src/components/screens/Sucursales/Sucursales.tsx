import { useEffect, useState } from "react";
import { ISucursalShort } from "../../../types/ISucursalShort";
import "./Sucursales.css";
import { EmpresaService } from "../../../services/EmpresaService";
import { useNavigate } from "react-router-dom";

const Sucursales = () => {
  const [sucursales, setSucursales] = useState<ISucursalShort[]>([]);

  const API_URL = import.meta.env.VITE_API_URL;
  const empresaService = new EmpresaService(API_URL + "/empresa");
  const navigate = useNavigate();

  const handleSelectSucursal = (id: number) => {
    localStorage.setItem("idSucursalEcommerce", id.toString());
    navigate("/");
  };

  useEffect(() => {
    const fetchSucursales = async () => {
      const sucursalesData = await empresaService.getSucursalesByEmpresaId(1);
      setSucursales(sucursalesData);
    };
    fetchSucursales();
  }, []);

  return (
    <div className="main-container">
      <h1 className="title">Selecciona una sucursal</h1>
      <div className="cards">
        {sucursales.map((sucursal) => (
          <div
            key={sucursal.id}
            onClick={() => handleSelectSucursal(sucursal.id)}
            className="card">
            <p className="tip">{sucursal.nombre}</p>
            <p className="second-text">
              {sucursal.domicilio.calle} {sucursal.domicilio.numero},{" "}
              {sucursal.domicilio.localidad.nombre}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sucursales;
