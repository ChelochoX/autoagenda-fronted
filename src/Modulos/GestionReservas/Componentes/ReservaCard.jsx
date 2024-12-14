import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../Estilos/ReservaCard.css";

export default function ReservaCard({ cita, onAccion }) {
  const [modalVisible, setModalVisible] = useState(false); // Estado del modal
  const [loading, setLoading] = useState(false); // Estado para el spinner
  const [detalleUsuario, setDetalleUsuario] = useState(null); // Datos del cliente

  // Obtener los datos del cliente
  const handleOpenModal = async () => {
    setModalVisible(true); // Mostrar modal
    setLoading(true); // Activar spinner
    try {
      const response = await fetch(
        `https://localhost:7050/api/Usuarios/${cita.idUsuario}`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("La respuesta no es un JSON válido.");
      }
      const data = await response.json();
      setDetalleUsuario(data); // Guardar datos del cliente
    } catch (error) {
      console.error("Error en la llamada al endpoint:", error);
      setDetalleUsuario(null); // Manejo de error
    } finally {
      setLoading(false); // Desactivar spinner
    }
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setDetalleUsuario(null); // Limpiar datos
  };

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
        position: "relative", // Para posicionar el ícono y modal
      }}
    >
      {/* Ícono para mostrar el modal */}
      <IconButton
        onClick={handleOpenModal}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "#1976d2",
        }}
      >
        <AccountCircleIcon />
      </IconButton>

      {/* Modal con animación de cortina */}
      <Box
        className={`modal-overlay ${modalVisible ? "show" : "hide"}`} // Clases dinámicas
      >
        {loading ? (
          <Box style={{ textAlign: "center", marginTop: "50px" }}>
            <CircularProgress />
          </Box>
        ) : detalleUsuario ? (
          <>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Detalles del Cliente
            </Typography>
            <Typography variant="body1">
              <strong>Nombre:</strong> {detalleUsuario.nombreCompleto}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {detalleUsuario.correo}
            </Typography>
            <Typography variant="body1">
              <strong>Teléfono:</strong> {detalleUsuario.telefono}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={handleCloseModal}
            >
              Cerrar
            </Button>
          </>
        ) : (
          <Typography variant="body1" color="error">
            No se pudieron cargar los datos del cliente.
          </Typography>
        )}
      </Box>

      <CardContent>
        <Typography
          variant="h6"
          style={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Tipo de Servicio: {cita.tipoServicio}
        </Typography>
        <Divider style={{ margin: "10px 0" }} />
        <Typography variant="body1">
          <strong>Fecha:</strong>{" "}
          {new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date(cita.fecha))}
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
            ...getEstadoStyles(cita.estado),
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
