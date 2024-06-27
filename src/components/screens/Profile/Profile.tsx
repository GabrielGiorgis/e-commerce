import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IClientePost } from "../../../types/Cliente/IClientePost";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Form } from "react-bootstrap";
import { ClienteService } from "../../../services/ClienteService";
import { IDomicilioPost } from "../../../types/Domicilio/IDomicilioPost";
import { IPedidoPost } from "../../../types/Pedido/IPedidoPost";
import DomicilioCard from "./DomicilioCard";
import { IDomicilio } from "../../../types/Domicilio/IDomicilio";
import { ModalDomicilio } from "../../ui/modals/modalDomicilio/ModalDomicilio";
import AddIcon from "@mui/icons-material/Add";

const API_URL = import.meta.env.VITE_API_URL;

export const Profile = () => {
  const [cliente, setCliente] = useState<IClientePost>({
    nombre: "",
    apellido: "",
    telefono: "",
    domicilios: [],
    pedidos: [],
    usuarioCliente: { userName: "", password: "", email: "" },
  });
  const [selectedDomicilioId, setSelectedDomicilioId] = useState<number | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [domicilios, setDomicilios] = useState<IDomicilio[]>([]);
  const [editingId, setEditingId] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const clienteService = new ClienteService(`${API_URL}/cliente`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("usuario.")) {
      setCliente({
        ...cliente,
        usuarioCliente: {
          ...cliente.usuarioCliente,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setCliente({ ...cliente, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      cliente.nombre.trim() === "" ||
      cliente.apellido.trim() === "" ||
      cliente.telefono.trim() === "" ||
      cliente.usuarioCliente.email.trim() === "" ||
      cliente.usuarioCliente.userName.trim() === ""
    ) {
      setError("Por favor, complete todos los campos");
      return;
    }

    try {
      await clienteService.put(editingId, cliente);
      setError("");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating cliente:", error);
      setError("Error actualizando el perfil");
    }
  };

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const idUser = localStorage.getItem("idUser");
        const response = await clienteService.getByUserId(Number(idUser));
        setCliente({
          nombre: response.nombre,
          apellido: response.apellido,
          telefono: response.telefono,
          domicilios: response.domicilios.map((dom: IDomicilioPost) => {
            return {
              calle: dom.calle,
              numero: dom.numero,
              cp: dom.cp,
              piso: dom.piso,
              nroDpto: dom.nroDpto,
              idLocalidad: dom.idLocalidad,
            };
          }),
          pedidos: response.pedidos.map((ped: IPedidoPost) => {
            return {
              fechaPedido: ped.fechaPedido,
              horaEstimadaFinalizacion: ped.horaEstimadaFinalizacion,
              total: ped.total,
              totalCosto: ped.totalCosto,
              estado: ped.estado,
              tipoEnvio: ped.tipoEnvio,
              formaPago: ped.formaPago,
              idDomicilio: ped.idDomicilio,
              idSucursal: ped.idSucursal,
              idCliente: ped.idCliente,
              factura: {
                fechaFacturacion: ped.factura?.fechaFacturacion,
                mpPaymentId: ped.factura?.mpPaymentId,
                mpMerchantOrderId: ped.factura?.mpMerchantOrderId,
                mpPreferenceId: ped.factura?.mpPreferenceId,
                mpPaymentType: ped.factura?.mpPaymentType,
                formaPago: ped.factura?.formaPago,
                totalVenta: ped.factura?.totalVenta,
              },
              idEmpleado: ped.idEmpleado,
              detallePedidos: ped.detallePedidos.map((det) => {
                return {
                  cantidad: det.cantidad,
                  subTotal: det.subTotal,
                  idArticulo: det.idArticulo,
                  idPromocion: det.idPromocion,
                };
              }),
            };
          }),
          usuarioCliente: {
            userName: response.usuarioCliente.userName,
            password: response.usuarioCliente.password,
            email: response.usuarioCliente.email,
          },
        });
        if (response.domicilios && response.domicilios.length > 0) {
          setSelectedDomicilioId(response.domicilios[0].id);
          setDomicilios(
            response.domicilios.map((dom: IDomicilio) => {
              return dom;
            })
          );
        }
        setEditingId(response.id);
      } catch (error) {
        console.error("Error fetching cliente:", error);
      }
    };
    fetchCliente();
  }, []);

  const handleDomicilioSelect = (id: number) => {
    localStorage.setItem("idUserDomicilio", id.toString());
    setSelectedDomicilioId(id);
  };

  return (
    <>
      <Box sx={{ padding: { xs: "20px", md: "30px" } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Perfil
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Form.Group controlId="nombre" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="nombre"
                  value={cliente.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Group controlId="apellido" className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="apellido"
                  value={cliente.apellido}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Group controlId="telefono" className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese su n° de teléfono"
                  name="telefono"
                  value={cliente.telefono}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Group controlId="userName" className="mb-3">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  name="usuario.userName"
                  value={cliente.usuarioCliente.userName}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su email"
                  name="usuario.email"
                  value={cliente.usuarioCliente.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  name="usuario.password"
                  value={cliente.usuarioCliente.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Guardar Cambios
            </Button>
          </Box>
          <Typography variant="h6" component="h3" sx={{ mt: 4 }}>
            Seleccionar Domicilio
          </Typography>
          <Grid container spacing={2} style={{ justifyContent: "flex-start" }}>
            {domicilios.map((domicilio) => (
              <Grid item key={domicilio.id}>
                <DomicilioCard
                  domicilio={domicilio}
                  isSelected={
                    selectedDomicilioId
                      ? domicilio.id === selectedDomicilioId
                      : domicilio.id ===
                        Number(localStorage.getItem("idUserDomicilio"))
                  }
                  onSelect={() => handleDomicilioSelect(domicilio.id)}
                />
              </Grid>
            ))}
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="primary"
                aria-label="add"
                onClick={() => setOpenModal(true)}>
                <Tooltip title="Agregar domicilio" arrow>
                  <AddIcon />
                </Tooltip>
              </IconButton>
            </Grid>
          </Grid>
        </Form>
      </Box>
      <ModalDomicilio
        show={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};
