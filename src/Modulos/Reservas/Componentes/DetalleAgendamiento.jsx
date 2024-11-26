import React from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";

const DetalleAgendamiento = ({ citas }) => {
  const getColorByEstado = (estado) => {
    switch (estado) {
      case "pendiente":
        return "#2196f3"; // Azul
      case "aprobado":
        return "#4caf50"; // Verde
      case "rechazado":
        return "#f28b82"; // Rojo claro
      default:
        return "#ddd"; // Color por defecto (gris claro)
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#f9fbe7", // Fondo amarillo claro
        display: "flex",
        flexDirection: "column",
        height: "100%", // Mantener la altura completa disponible
      }}
    >
      {/* Título */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          color: "#558b2f", // Verde oscuro
          fontWeight: "bold",
        }}
      >
        Detalles del Agendamiento
      </Typography>

      {/* Contenedor con scroll */}
      <Box
        sx={{
          overflowY: "auto", // Habilitar scroll vertical
          maxHeight: "600px", // Altura máxima del componente
          paddingRight: "5px", // Espacio para evitar que el scroll tape contenido
        }}
      >
        {citas.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No hay citas para esta fecha.
          </Typography>
        ) : (
          <List>
            {citas.map((cita, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: getColorByEstado(cita.estado), // Color según el estado
                  borderRadius: "5px",
                  marginBottom: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", fontWeight: "bold" }} // Texto blanco para mejor contraste
                    >
                      {cita.hora} - {cita.titulo}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: "white" }}>
                      {cita.descripcion}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default DetalleAgendamiento;
