import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Radio,
  Tooltip,
  Typography,
} from "@mui/material";
import { IDomicilio } from "../../../types/Domicilio/IDomicilio";
import EditIcon from "@mui/icons-material/Edit";
import "./DomicilioCard.css"; // Crear este archivo CSS para estilos personalizados
import { ModalDomicilio } from "../../ui/modals/modalDomicilio/ModalDomicilio";

interface DomicilioCardProps {
  domicilio: IDomicilio;
  isSelected: boolean;
  onSelect: () => void;
}

const DomicilioCard: React.FC<DomicilioCardProps> = ({
  domicilio,
  isSelected,
  onSelect,
}) => {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <Card
        sx={{ minWidth: 275, borderRadius: "10px" }}
        className={`domicilio-card selected`}
        // onClick={onSelect} //lamentablemente esto no queda porque no permite usar el de edit
        style={{ userSelect: "none" }}>
        <CardContent className="domicilio-card-content">
          <Tooltip title="Seleccionar domicilio" arrow>
            <Radio
              onClick={onSelect}
              checked={isSelected}
              onChange={onSelect}
              value={domicilio.id}
              name="domicilio-radio"
              className="domicilio-radio"
            />
          </Tooltip>
          <div className="domicilio-details">
            <Typography variant="h6" component="div" fontWeight="bold">
              {domicilio.calle.charAt(0).toUpperCase() +
                domicilio.calle.slice(1).toLowerCase()}{" "}
              {domicilio.numero}
            </Typography>
            <Typography color="textSecondary">
              {domicilio.localidad.nombre},{" "}
              {domicilio.localidad.provincia.nombre},{" "}
              {domicilio.localidad.provincia.pais.nombre}
            </Typography>
          </div>
          <IconButton
            style={{ alignSelf: "flex-start" }}
            color="info"
            aria-label="add"
            className="edit-button"
            onClick={() => {
              setOpenModal(true);
            }}>
            <Tooltip title="Editar domicilio" arrow>
              <EditIcon />
            </Tooltip>
          </IconButton>
        </CardContent>
      </Card>
      <ModalDomicilio
        show={openModal}
        handleClose={() => setOpenModal(false)}
        selectedDomicilio={domicilio}
      />
    </>
  );
};

export default DomicilioCard;
