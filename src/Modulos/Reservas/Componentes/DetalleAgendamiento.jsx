import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Ícono de Modificar
import DeleteIcon from "@mui/icons-material/Delete"; // Ícono de Eliminar

const DetalleAgendamiento = ({ citas, onCancelar, onModificar }) => {
  const getColorByEstado = (estado) => {
    switch (estado) {
      case "pendiente":
        return "#2196f3"; // Azul
      case "aprobado":
        return "#4caf50"; // Verde
      case "rechazado":
        return "#f28b82"; // Rojo claro
      default:
        return "#ddd"; // Gris claro
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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Información de la cita */}
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", fontWeight: "bold" }} // Texto blanco para mejor contraste
                    >
                      Hora: {cita.hora} - Modelo: {cita.marca} {cita.modelo}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        sx={{ color: "white", fontWeight: "bold" }}
                      >
                        Año: {cita.anho}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        Chapa: {cita.placa}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        Tipo de Servicio: {cita.tipoServicio} {/* AGREGADO */}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        Descripción: {cita.descripcion}
                      </Typography>
                    </>
                  }
                />

                {/* Botones de acción */}
                <Box>
                  {/* Botón de Modificar */}
                  <IconButton
                    aria-label="modificar"
                    onClick={() => onModificar(cita)}
                    sx={{ color: "white", marginRight: 1 }}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Botón de Eliminar */}
                  <IconButton
                    aria-label="eliminar"
                    onClick={() => onCancelar(cita)}
                    sx={{ color: "white" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default DetalleAgendamiento;
