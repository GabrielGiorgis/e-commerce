import { IFactura } from "../types/Factura/IFactura";
import { BackendClient } from "./BackendClient";

export class FacturaService extends BackendClient<IFactura, IFactura, IFactura> {
}