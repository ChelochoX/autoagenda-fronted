import React from "react";
import { Box, Button } from "@mui/material";

const AccionesReservas = () => {
  return (
    <Box
      sx={{
        marginTop: 2,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f4f4f4", // Fondo gris claro
        display: "flex",
        flexDirection: "column",
        gap: 2, // Espaciado entre botones
      }}
    >
      {/* Botón Reservar */}
      <Button
        variant="contained"
        color="primary"
        sx={{ fontWeight: "bold" }}
        onClick={() => alert("Funcionalidad para reservar próximamente")}
      >
        Reservar
      </Button>

      {/* Botón Solicitar Presupuesto */}
      <Button
        variant="outlined"
        color="secondary"
        sx={{ fontWeight: "bold" }}
        onClick={() => alert("Funcionalidad para solicitar presupuesto próximamente")}
      >
        Solicitar Presupuesto
      </Button>
    </Box>
  );
};

export default AccionesReservas;
