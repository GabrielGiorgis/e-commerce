import { useState } from "react";
import { IDomicilio } from "../../../types/IDomicilio";
import { Modal, Form } from "react-bootstrap";
import { Grid } from "@mui/material";
interface DomcicilioProps {
    elementActive: boolean
    handleClose: () => void
    handleSubmit: () => void
    setDomicilio: React.Dispatch<React.SetStateAction<IDomicilio>>
    domicilio: IDomicilio
}
export const DomicilioForm = ({ elementActive, handleClose, handleSubmit, setDomicilio, domicilio }: DomcicilioProps ) => {

    return (
        <>
            {/* CAMPOS DE DOMICILIO */}
            <div>Domicilio</div>
        </>
    )
}
