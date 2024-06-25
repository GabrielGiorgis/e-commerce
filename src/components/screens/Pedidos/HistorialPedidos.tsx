import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { ICliente } from "../../../types/Cliente/ICliente";
import { IPedidoPost } from "../../../types/Pedido/IPedidoPost";
import { ClienteService } from "../../../services/ClienteService";
import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { Link, Tooltip, TableSortLabel } from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";
import "./pedidosStyle.css";

const HistorialPedidos = () => {
  const [cliente, setCliente] = useState<ICliente>();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("fechaPedido");

  const API_URL = import.meta.env.VITE_API_URL;
  const clienteService = new ClienteService(`${API_URL}/cliente`);

  useEffect(() => {
    getCliente();
  }, []);

  const getCliente = async () => {
    const userid = localStorage.getItem("idUser");
    if (userid) {
      const cliente = await clienteService.getById(Number(userid));
      if (cliente) {
        setCliente(cliente);
      } else {
        console.log("No se encontro el cliente");
      }
    }
  };

  const getRelativeDate = (date: string) => {
    const parsedDate = new Date(date);
    parsedDate.setHours(parsedDate.getHours());
    if (isToday(parsedDate)) {
      return "Hoy";
    } else if (isYesterday(parsedDate)) {
      return "Ayer";
    } else if (differenceInDays(new Date(), parsedDate) < 7) {
      const date = `${format(parsedDate, "EEEE", { locale: es })}`;
      return date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();
    } else {
      return format(parsedDate, "dd/MM/yyyy");
    }
  };

  const transformPedidosToRows = (pedidos: IPedidoPost[]) => {
    return pedidos.map((pedido) => {
      console.log();
      const parsedDate = new Date(pedido.fechaPedido);
      return {
        id: pedido.id,
        fechaPedido: parsedDate,
        fecha: format(parsedDate, "dd/MM/yyyy"),
        hora: pedido.horaEstimadaFinalizacion,
        relativo: getRelativeDate(pedido.fechaPedido),
        estado: pedido.estado,
        tipoEnvio: pedido.tipoEnvio,
        total: pedido.total,
        formaPago: pedido.formaPago,
        factura: pedido.factura,
      };
    });
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = cliente
    ? transformPedidosToRows(cliente.pedidos)
        .slice()
        .sort((a, b) => {
          if (orderBy === "fechaPedido") {
            return order === "asc"
              ? a.fechaPedido.getTime() - b.fechaPedido.getTime()
              : b.fechaPedido.getTime() - a.fechaPedido.getTime();
          }

          const valueA = (a as any)[orderBy];
          const valueB = (b as any)[orderBy];

          if (valueA === null || valueA === undefined) return 1;
          if (valueB === null || valueB === undefined) return -1;

          if (typeof valueA === "string" && typeof valueB === "string") {
            return order === "asc"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }

          if (typeof valueA === "number" && typeof valueB === "number") {
            return order === "asc" ? valueA - valueB : valueB - valueA;
          }

          return 0;
        })
    : [];

  const statusOptions = [
    { label: "PENDIENTE", color: "#FFEB3B" },
    { label: "CANCELADO", color: "#F44336" },
    { label: "RECHAZADO", color: "#FF5722" },
    { label: "APROBADO", color: "#8BC34A" },
    { label: "PREPARACION", color: "#03A9F4" },
    { label: "TERMINADO", color: "#4CAF50" },
    { label: "DELIVERY", color: "#2196F3" },
    { label: "FACTURADO", color: "#9C27B0" },
  ];

  if (cliente) {
    return (
      <div style={{ padding: "30px " }}>
        <h2>
          Pedidos de {cliente.nombre} {cliente.apellido}
        </h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pago</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "fechaPedido"}
                    direction={orderBy === "fechaPedido" ? order : "asc"}
                    onClick={() => handleRequestSort("fechaPedido")}>
                    Fecha
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "hora"}
                    direction={orderBy === "hora" ? order : "asc"}
                    onClick={() => handleRequestSort("hora")}>
                    Hora
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "tipoEnvio"}
                    direction={orderBy === "tipoEnvio" ? order : "asc"}
                    onClick={() => handleRequestSort("tipoEnvio")}>
                    Envío
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "estado"}
                    direction={orderBy === "estado" ? order : "asc"}
                    onClick={() => handleRequestSort("estado")}>
                    Estado
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "total"}
                    direction={orderBy === "total" ? order : "asc"}
                    onClick={() => handleRequestSort("total")}>
                    Total
                  </TableSortLabel>
                </TableCell>
                <TableCell>Descargar Factura</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {row.formaPago === "EFECTIVO" ? (
                      <Tooltip title="Pago con efectivo" arrow>
                        <MoneyIcon style={{ color: "#4caf50" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Pago con mercado pago" arrow>
                        <p className="mp-text">
                          m<span>p</span>
                        </p>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{row.relativo}</TableCell>
                  <TableCell>{row.hora}</TableCell>
                  <TableCell>
                    {row.tipoEnvio === "DELIVERY"
                      ? "Delivery"
                      : "Retiro en local"}
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}>
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor:
                            statusOptions.find(
                              (status) => status.label === row.estado
                            )?.color || "#000",
                        }}></span>
                      <p style={{ margin: "0" }}>
                        {row.estado.charAt(0).toUpperCase() +
                          row.estado.slice(1).toLowerCase()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>${row.total}.00</TableCell>
                  <TableCell>
                    <Link
                      href={`${API_URL}/pedido/downloadFacturaPedido/${row.id}`}
                      target="_blank"
                      underline="none">
                      <Button variant="contained" color="success">
                        Descargar
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <div>No hay un cliente activo</div>;
  }
};

export default HistorialPedidos;
