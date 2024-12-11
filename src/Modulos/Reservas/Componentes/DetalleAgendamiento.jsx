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

const DetalleAgendamiento = ({ citas, onModificar, onEliminarCita }) => {
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

  const eliminarCita = async (idCita) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7050/api/Citas/${idCita}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la cita");
      }

      alert("Cita eliminada exitosamente");
      onEliminarCita(idCita); // Recargar citas después de eliminar
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
      alert("Ocurrió un error al eliminar la cita.");
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
      {/* Contenedor para el título */}
      <Box
        sx={{
          backgroundColor: "#558b2f", // Fondo verde oscuro
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para destacar
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white", // Texto blanco para contraste
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Detalles del Agendamiento
        </Typography>
      </Box>

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
                    onClick={() => eliminarCita(cita.idCita)}
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
