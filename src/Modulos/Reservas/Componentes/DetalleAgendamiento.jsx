import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DetalleAgendamiento = ({ citas, onEliminarCita }) => {
  // Obtener color según el estado
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

  // Calcular el monto total de los servicios en una cita
  const calcularMontoTotal = (detallesCita) =>
    detallesCita.reduce(
      (total, detalle) => total + (detalle.precioServicio || 0),
      0
    );

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#f9fbe7",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Título */}
      <Box
        sx={{
          backgroundColor: "#558b2f",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
        >
          Detalles del Agendamiento
        </Typography>
      </Box>

      {/* Contenedor con scroll */}
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "600px",
          paddingRight: "5px",
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
                  backgroundColor: getColorByEstado(cita.estado),
                  borderRadius: "5px",
                  marginBottom: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "10px",
                  position: "relative", // Para posicionar el botón de eliminar
                }}
              >
                {/* Botón de eliminar, solo si el estado no es "cerrado" */}
                {cita.estado.toLowerCase() !== "cerrado" && (
                  <IconButton
                    aria-label="eliminar"
                    onClick={() => onEliminarCita(cita.idCita)}
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: "#e57373", // Rojo más claro
                      "&:hover": { color: "#ef9a9a" }, // Cambio de color al pasar el cursor
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}

                {/* Información de la cita */}
                <Typography
                  variant="subtitle1"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Hora: {cita.hora || "Sin hora"} - Modelo:{" "}
                  {cita.marca || "N/A"} {cita.modelo || ""}
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  Año: {cita.anho || "N/A"} - Chapa: {cita.placa || "Sin placa"}
                </Typography>

                {/* Servicios Solicitados */}
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: "bold", marginTop: "8px" }}
                >
                  Servicios Solicitados:
                </Typography>
                <List sx={{ paddingLeft: "20px", color: "#fff" }}>
                  {cita.detallesCita && cita.detallesCita.length > 0 ? (
                    cita.detallesCita.map((detalle, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ color: "white" }}>
                              {detalle.tipoServicio || "Sin servicio"} -{" "}
                              {detalle.precioServicio
                                ? `${detalle.precioServicio.toLocaleString(
                                    "es-PY"
                                  )} Gs.`
                                : "Sin precio"}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              sx={{ color: "#cfd8dc" }}
                            >
                              {detalle.descripcion || "Sin descripción"}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ color: "#cfd8dc", marginLeft: "16px" }}
                    >
                      No se han agregado servicios a esta cita.
                    </Typography>
                  )}
                </List>

                {/* Monto total de servicios */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    marginTop: "8px",
                    textAlign: "right",
                  }}
                >
                  Total:{" "}
                  {cita.detallesCita
                    ? `${calcularMontoTotal(cita.detallesCita).toLocaleString(
                        "es-PY"
                      )} Gs.`
                    : "0 Gs."}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default DetalleAgendamiento;
