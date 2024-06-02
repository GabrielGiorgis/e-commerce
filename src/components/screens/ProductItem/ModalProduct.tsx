import React, { useState } from "react";
import { IArticulo } from "../../../types/IArticulo";
import { Modal, Typography } from "@mui/material";
import { ModalDialog } from "react-bootstrap";
import "./StyleModalProduct.css";
interface IModalProduct {
  product: IArticulo;
  openModal: boolean;
  handleCloseModal: () => void;
}
export const ModalProduct = ({ product, openModal, handleCloseModal }: IModalProduct) => {

  return (
    <div>
      <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modal-modal-title">
              {product.denominacion}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-media">
            <img src={product.imagenes[0].url} alt={product.imagenes[0].name} />
          </div>
          <div className="modal-body">
            <Typography variant="body2" color="text.secondary">
              ${product.precioVenta.toFixed(2)}
            </Typography>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Modal>
    </div>
  );
};
export default ModalProduct;
