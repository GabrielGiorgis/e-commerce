import { ISucursalShort } from "../types/ISucursalShort";
import { BackendClient } from "./BackendClient";

export class SucursalService extends BackendClient<
  ISucursalShort,
  ISucursalShort,
  ISucursalShort
> {}
