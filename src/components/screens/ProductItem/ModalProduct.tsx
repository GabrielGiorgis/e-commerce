import { IArticulo } from "../../../types/IArticulo";
import { Modal, Typography, IconButton } from "@mui/material";
import "./ModalProduct.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface IModalProduct {
  product: IArticulo;
  openModal: boolean;
  handleCloseModal: () => void;
}
export const ModalProduct = ({
  product,
  openModal,
  handleCloseModal,
}: IModalProduct) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
            <div className="modal-media">
              <img
                src={product.imagenes[0].url}
                alt={product.imagenes[0].name}
                className="modal-image"
              />
            </div>
            <div className="modal-header">
              <h5 className="modal-title" id="modal-modal-title">
                {product.denominacion}
              </h5>
            </div>
            <div className="modal-body">
              <Typography variant="body2" color="text.secondary">
                ${product.precioVenta.toFixed(2)}
              </Typography>
            </div>
            <div className="modal-footer">
              <IconButton>
                <ShoppingCartIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ModalProduct;
