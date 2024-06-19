import React from "react";
import { Alert, Snackbar } from "@mui/material";

export const AlertSnackbar = ({ message, severity }) => {
  const [open, setOpen] = React.useState(false);

  // Abre el Snackbar cuando se crea el pedido
  React.useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
