import { Modal, Typography, IconButton } from "@mui/material";
import "./ModalProduct.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ICartItem } from "../../../../types/Cart/ICartItem";
import { IArticulo } from "../../../../types/IArticulo";
import { IPromocion } from "../../../../types/IPromocion";

interface IModalProduct {
  product: ICartItem["product"];
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
          // width: "400px",
        }}>
        <div
          style={{
            width: "400px",
            borderRadius: "25px",
            height: "inherit",
            padding: "16px",
          }}
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseModal}></button>
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
                $
                {(product as IArticulo)?.precioVenta?.toFixed(2) ||
                  (product as IPromocion)?.precioPromocional?.toFixed(2)}
              </Typography>
              <p
                className="modal-description"
                style={{ whiteSpace: "pre-wrap" }}>
                {(product as IArticulo)?.descripcion ||
                  (product as IPromocion)?.descripcionDescuento}
              </p>
              {(() => {
                if (
                  "promocionDetalles" in product &&
                  Array.isArray(product.promocionDetalles)
                ) {
                  return (
                    <>
                      <p>Contiene: </p>
                      {product.promocionDetalles.map((detalle, index) => (
                        <span className="text-body" key={index}>
                          <b>{detalle.cantidad}x</b> -{" "}
                          {detalle.articulo?.denominacion}
                        </span>
                      ))}
                    </>
                  );
                }
                return null;
              })()}
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
