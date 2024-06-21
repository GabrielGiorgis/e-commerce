import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICliente } from "../../../types/ICliente";
import "./RegisterClient.css";
import { Box, Button, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Form } from "react-bootstrap";

const steps = ["Datos Personales", "Domicilio"];

export const RegisterClient = () => {
  const [cliente, setCliente] = useState<ICliente>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    imagenCliente: { UUID: "", name: "", url: "" },
    domicilios: [],
    pedidos: [],
    usuario: { userName: "", password: "" },
  });

  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      try {
        handleSubmit();
      } catch (err) {
        console.log(err);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, usuario: { ...cliente.usuario, [name]: value } });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación básica
    if (
      cliente.nombre.trim() === "" ||
      cliente.apellido.trim() === "" ||
      cliente.telefono.trim() === "" ||
      cliente.email.trim() === "" ||
      cliente.usuario.userName.trim() === "" ||
      cliente.usuario.password.trim() === ""
    ) {
      setError("Por favor, complete todos los campos");
      return;
    }
    // Aquí puedes manejar la lógica de registro
    console.log("Cliente:", cliente);
    // Reset error message
    setError("");
    navigate("/login");
  };

  return (
    <>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className="stepper-padding"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box className="box-row">
            <Box className="box-auto-flex" />
            <Button onClick={handleSubmit}>Registrarse</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            {activeStep === 0 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* NOMBRE */}
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
                  <Grid item xs={6}>
                    {/* APELLIDO */}
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
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* TELEFONO */}
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
                  <Grid item xs={6}>
                    {/* NOMBRE DE USUARIO */}
                    <Form.Group controlId="userName" className="mb-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su nombre de usuario"
                        name="userName"
                        value={cliente.usuario.userName}
                        onChange={handleUsuarioChange}
                      />
                    </Form.Group>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* EMAIL */}
                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese su email"
                        name="email"
                        value={cliente.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Grid>
                  <Grid item xs={6}>
                    {/* CONTRASEÑA */}
                    <Form.Group controlId="password" className="mb-3">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Ingrese su contraseña"
                        name="password"
                        value={cliente.usuario.password}
                        onChange={handleUsuarioChange}
                      />
                    </Form.Group>
                  </Grid>
                </Grid>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* CALLE */}
                    <Form.Group controlId="calle" className="mb-3">
                      <Form.Label>Calle</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la calle"
                        name="email"
                        value={cliente.domicilios[0].calle}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Grid>
                  <Grid item xs={6}>
                    {/* LOCALIDAD */}
                    <Form.Group controlId="localidad" className="mb-3">
                      <Form.Label>Localidad</Form.Label>
                      <Form.Control
                        type=""
                        placeholder="Ingrese la localidad"
                        name=""
                        value={cliente.domicilios[0].idLocalidad}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {/* NUMERO */}
                    <Form.Group controlId="numero" className="mb-3">
                      <Form.Label>Número</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el número"
                        name="numero"
                        value={cliente.domicilios[0].numero}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Grid>
                  <Grid item xs={6}>
                    {/* NRO DPTO */}
                    <Form.Group controlId="nroDpto" className="mb-3">
                      <Form.Label>Número Departamento</Form.Label>
                      <Form.Control
                        type=""
                        placeholder="Ingrese su localidad"
                        name=""
                        value={cliente.domicilios[0].idLocalidad}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Grid>
                </Grid>
              </>
            )}
            <Box className="box-row-center">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Atrás
              </Button>
              <Box className="box-auto-flex" />
              <Button
                onClick={handleNext}
                variant="contained"
                color={activeStep === steps.length - 1 ? "success" : "primary"}
              >
                {activeStep === steps.length - 1 ? "Registrarse" : "Siguiente"}
              </Button>
            </Box>
          </Form>
        </React.Fragment>
      )}
    </>
  );
};
