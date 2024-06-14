import { ICliente } from "../types/ICliente";
import { BackendClient } from "./BackendClient";

export class ClienteService extends BackendClient<
    ICliente,
    ICliente,
    ICliente
> {
    
}