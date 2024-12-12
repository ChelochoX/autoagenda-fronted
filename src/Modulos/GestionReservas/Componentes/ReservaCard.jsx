import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";

export default function ReservaCard({ cita, onAccion }) {
  // Definir colores según estado
  const getEstadoStyles = (estado) => {
    switch (estado) {
      case "aprobado":
        return { backgroundColor: "rgba(76, 175, 80, 0.2)", color: "#4caf50" }; // Verde suave
      case "pendiente":
        return { backgroundColor: "rgba(25, 118, 210, 0.2)", color: "#1976d2" }; // Azul suave
      case "rechazado":
        return { backgroundColor: "rgba(244, 67, 54, 0.2)", color: "#f44336" }; // Rojo suave
      default:
        return { backgroundColor: "#f0f0f0", color: "#000" }; // Por defecto
    }
  };

  return (
    <Card
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "15px",
        minWidth: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          style={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Tipo de Servicio: {cita.tipoServicio}
        </Typography>
        <Divider style={{ margin: "10px 0" }} />
        <Typography variant="body1">
          <strong>Fecha:</strong> {cita.fecha}
        </Typography>
        <Typography variant="body1">
          <strong>Hora:</strong> {cita.hora}
        </Typography>
        <Box
          style={{
            display: "inline-block",
            padding: "4px 8px",
            borderRadius: "4px",
            marginTop: "5px",
            fontWeight: "bold",
            ...getEstadoStyles(cita.estado), // Aplicar estilos según el estado
          }}
        >
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Estado: {cita.estado}
          </Typography>
        </Box>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          <strong>Descripción:</strong> {cita.descripcion}
        </Typography>
      </CardContent>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
      >
        <Button
          variant="outlined"
          style={{
            borderColor: "#4caf50",
            color: "#4caf50",
            margin: "0 5px",
          }}
          onClick={() => onAccion("aprobar", cita)}
        >
          Aprobar
        </Button>
        <Button
          variant="outlined"
          style={{
            borderColor: "#1976d2",
            color: "#1976d2",
            margin: "0 5px",
          }}
          onClick={() => onAccion("modificar", cita)}
        >
          Modificar
        </Button>
        <Button
          variant="outlined"
          style={{
            borderColor: "#f44336",
            color: "#f44336",
            margin: "0 5px",
          }}
          onClick={() => onAccion("rechazar", cita)}
        >
          Rechazar
        </Button>
      </Box>
    </Card>
  );
}
