import React from "react";
import { Box, Button } from "@mui/material";

const AccionesReservas = ({ onReservar }) => {
  return (
    <Box
      sx={{
        marginTop: 2,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Botón Reservar */}
      <Button
        variant="contained"
        color="primary"
        sx={{ fontWeight: "bold" }}
        onClick={onReservar} // Usar la prop correctamente
      >
        Reservar
      </Button>

      {/* Botón Solicitar Presupuesto */}
      <Button
        variant="outlined"
        color="secondary"
        sx={{ fontWeight: "bold" }}
        onClick={() =>
          alert("Funcionalidad para solicitar presupuesto próximamente")
        }
      >
        Solicitar Presupuesto
      </Button>
    </Box>
  );
};

export default AccionesReservas;
