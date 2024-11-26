import React from "react";
import { Box, Typography } from "@mui/material";

const LeyendaEstados = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2,
        padding: 1,
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9fbe7", // Fondo amarillo claro
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: "#2196f3", // Azul para Pendiente
            borderRadius: "50%",
            marginRight: 1,
          }}
        ></Box>
        <Typography variant="body2">Pendiente</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: "#4caf50", // Verde para Aprobado
            borderRadius: "50%",
            marginRight: 1,
          }}
        ></Box>
        <Typography variant="body2">Aprobado</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: "#f44336", // Rojo claro para Rechazado
            borderRadius: "50%",
            marginRight: 1,
          }}
        ></Box>
        <Typography variant="body2">Rechazado</Typography>
      </Box>
    </Box>
  );
};

export default LeyendaEstados;
