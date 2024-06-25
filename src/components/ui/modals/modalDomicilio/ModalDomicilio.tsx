import React, { useEffect, useState } from "react";
import { PaisService } from "../../../../services/PaisService";
import { IDomicilioPost } from "../../../../types/Domicilio/IDomicilioPost";
import { IPais } from "../../../../types/Pais/IPais";
import { IProvincia } from "../../../../types/Provincia/IProvincia";
import { ILocalidad } from "../../../../types/Localidad/ILocalidad";
import { Modal, Form } from "react-bootstrap";
import { Box, Button, Grid } from "@mui/material";
import { IDomicilio } from "../../../../types/Domicilio/IDomicilio";
import { DomicilioService } from "../../../../services/DomicilioService";

const API_URL = import.meta.env.VITE_API_URL;

interface DomicilioModalProps {
  show: boolean;
  handleClose: () => void;
  setDomicilios: React.Dispatch<React.SetStateAction<IDomicilio[]>>;
  selectedDomicilio?: IDomicilio;
}

export const ModalDomicilio: React.FC<DomicilioModalProps> = ({
  show,
  handleClose,
  setDomicilios,
  selectedDomicilio,
}) => {
  const [error, setError] = useState<string>("");
  const [domicilio, setDomicilio] = useState<IDomicilioPost>({
    calle: "",
    numero: 0,
    cp: 0,
    piso: 0,
    nroDpto: 0,
    idLocalidad: 0,
  });
  const [paises, setPaises] = useState<IPais[]>([]);
  const [idPais, setIdPais] = useState<number>(0);
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [idProvincia, setIdProvincia] = useState<number>(0);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

  const domicilioService = new DomicilioService(API_URL + "/domicilio");
  const paisService = new PaisService(API_URL + "/pais");

  const handlePaisChange = async (e: any) => {
    const selectedPaisId = Number(e.target.value);
    setDomicilio((prevState) => ({
      ...prevState,
      idPais: selectedPaisId,
      idProvincia: 0,
      idLocalidad: 0,
    }));

    if (selectedPaisId !== 0) {
      try {
        const provincias = await fetchProvinciasByPais(selectedPaisId);
        setIdPais(selectedPaisId);
        setProvincias(provincias);
        setLocalidades([]);
      } catch (error) {
        console.error("Error al obtener las provincias:", error);
      }
    } else {
      setProvincias([]);
      setLocalidades([]);
    }
  };

  const handleProvinciaChange = async (e: any) => {
    const selectedProvinciaId = Number(e.target.value);
    setDomicilio((prevState) => ({
      ...prevState,
      idProvincia: selectedProvinciaId,
      idLocalidad: 0,
    }));

    if (selectedProvinciaId !== 0) {
      try {
        const localidades = await fetchLocalidadesByProvincia(
          selectedProvinciaId
        );
        setIdProvincia(selectedProvinciaId);
        setLocalidades(localidades);
      } catch (error) {
        console.error("Error al obtener las localidades:", error);
      }
    } else {
      setLocalidades([]);
    }
  };

  const handleLocalidadChange = (e: any) => {
    const selectedLocalidadId = Number(e.target.value);
    setDomicilio((prevState) => ({
      ...prevState,
      idLocalidad: selectedLocalidadId,
    }));
  };

  const internalHandleClose = () => {
    setDomicilio({
      calle: "",
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
      idLocalidad: 0,
    });
    setError("");
    setPaises([]);
    setIdPais(0);
    setProvincias([]);
    setIdProvincia(0);
    setLocalidades([]);
    handleClose();
  };

  const fetchPaises = async () => {
    try {
      const response = await paisService.getAll();
      setPaises(response);
    } catch (error) {
      console.error("Error al obtener la lista de países:", error);
    }
  };

  const fetchProvinciasByPais = async (paisId: number) => {
    try {
      const response = await fetch(`${API_URL}/provincia/findByPais/${paisId}`);
      return response.json();
    } catch (error) {
      throw new Error("Error al obtener las provincias por país");
    }
  };

  const fetchLocalidadesByProvincia = async (provinciaId: number) => {
    try {
      const response = await fetch(
        `${API_URL}/localidad/findByProvincia/${provinciaId}`
      );
      return response.json();
    } catch (error) {
      throw new Error("Error al obtener las localidades por provincia");
    }
  };

  const handleDelete = () => {
    //agregar delete
  };

  const handleSave = () => {
    if (selectedDomicilio) {
      return onUpdate();
    }
    return onSave();
  };

  const onSave = async () => {
    const response = await domicilioService.post(domicilio);
    console.log(response);
    internalHandleClose();
  };

  const onUpdate = async () => {
    if (selectedDomicilio) {
      const response = await domicilioService.put(
        selectedDomicilio.id,
        domicilio
      );
    }
    internalHandleClose();
  };

  const getButtonText = () => {
    return selectedDomicilio != null ? "Actualizar" : "Guardar";
  };

  useEffect(() => {
    fetchPaises();
    const fetchData = async () => {
      if (show && selectedDomicilio) {
        setDomicilio({
          calle: selectedDomicilio.calle,
          numero: selectedDomicilio.numero,
          cp: selectedDomicilio.cp,
          piso: selectedDomicilio.piso,
          nroDpto: selectedDomicilio.nroDpto,
          idLocalidad: selectedDomicilio.localidad.id,
        });
        setProvincias(
          await fetchProvinciasByPais(
            selectedDomicilio.localidad.provincia.pais.id
          )
        );
        setLocalidades(
          await fetchLocalidadesByProvincia(
            selectedDomicilio.localidad.provincia.id
          )
        );
        setIdPais(selectedDomicilio.localidad.provincia.pais.id);
        setIdProvincia(selectedDomicilio.localidad.provincia.id);
      }
    };

    fetchData();
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={internalHandleClose} size="lg">
        <Modal.Header closeButton style={{ alignItems: "center" }}>
          <Modal.Title>
            {selectedDomicilio != null ? "Editar" : "Añadir"} domicilio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}
          <Form>
            <Form.Group controlId="formDomicilioCalle" className="mb-3">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="text"
                value={domicilio.calle}
                onChange={(e) =>
                  setDomicilio({ ...domicilio, calle: e.target.value })
                }
              />
            </Form.Group>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Form.Group controlId="formDomicilioNumero" className="mb-3">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="number"
                    value={domicilio.numero}
                    onChange={(e) =>
                      setDomicilio({
                        ...domicilio,
                        numero: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.Group controlId="formDomicilioCp" className="mb-3">
                  <Form.Label>Código Postal</Form.Label>
                  <Form.Control
                    type="number"
                    value={domicilio.cp}
                    onChange={(e) =>
                      setDomicilio({
                        ...domicilio,
                        cp: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Form.Group controlId="formDomicilioPiso" className="mb-3">
                  <Form.Label>Piso</Form.Label>
                  <Form.Control
                    type="number"
                    value={domicilio.piso}
                    onChange={(e) =>
                      setDomicilio({
                        ...domicilio,
                        piso: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.Group controlId="formDomicilioNroDpto" className="mb-3">
                  <Form.Label>Número Depto.</Form.Label>
                  <Form.Control
                    type="number"
                    value={domicilio.nroDpto}
                    onChange={(e) =>
                      setDomicilio({
                        ...domicilio,
                        nroDpto: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Form.Group controlId="formPais" className="mb-3">
                  <Form.Label>País</Form.Label>
                  <Form.Control
                    as="select"
                    value={idPais}
                    onChange={handlePaisChange}>
                    <option value={0}>Seleccionar País</option>
                    {paises.map((pais) => (
                      <option key={pais.id} value={pais.id}>
                        {pais.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form.Group controlId="formProvincia" className="mb-3">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control
                    as="select"
                    value={idProvincia}
                    onChange={handleProvinciaChange}>
                    <option value={0}>Seleccionar Provincia</option>
                    {provincias.map((provincia) => (
                      <option key={provincia.id} value={provincia.id}>
                        {provincia.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form.Group controlId="formLocalidad" className="mb-3">
                  <Form.Label>Localidad</Form.Label>
                  <Form.Control
                    as="select"
                    value={domicilio.idLocalidad}
                    onChange={handleLocalidadChange}>
                    <option value={0}>Seleccionar Localidad</option>
                    {localidades.map((localidad) => (
                      <option key={localidad.id} value={localidad.id}>
                        {localidad.nombre}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Grid>
            </Grid>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              alignItems: "center",
            }}>
            <Box sx={{ flex: "1 1 auto" }} />
            {selectedDomicilio != null && (
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Eliminar
              </Button>
            )}
            <Button
              variant="contained"
              color={selectedDomicilio != null ? "success" : "primary"}
              onClick={handleSave}>
              {getButtonText()}
            </Button>
          </Box>
        </Modal.Footer>
      </Modal>
    </>
  );
};
