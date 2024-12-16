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
  Chip,
  TextField,
  Alert,
  AlertTitle,
  Stack,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../Estilos/ReservaCard.css";

export default function ReservaCard({ cita, onAccion }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detalleUsuario, setDetalleUsuario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedHora, setUpdatedHora] = useState(
    new Date(`1970-01-01T${cita.hora}`)
  );
  const [updatedDescripcion, setUpdatedDescripcion] = useState(
    cita.descripcion
  );

  // Nuevo: Estados para valores originales
  const [originalHora, setOriginalHora] = useState(
    new Date(`1970-01-01T${cita.hora}`)
  );
  const [originalDescripcion, setOriginalDescripcion] = useState(
    cita.descripcion
  );

  // Estado para las alertas
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const [estadoCita, setEstadoCita] = useState(cita.estado);
  const [isLoading, setIsLoading] = useState(false);

  // Determinar si los botones deben estar deshabilitados
  const botonesDeshabilitados = estadoCita !== "pendiente";

  const handleEdit = () => {
    setOriginalHora(updatedHora);
    setOriginalDescripcion(updatedDescripcion);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setUpdatedHora(originalHora);
    setUpdatedDescripcion(originalDescripcion);
    setIsEditing(false);

    // Mostrar alerta
    setAlert({
      type: "info",
      message: "Cambios descartados.",
      visible: true,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const formattedHora = updatedHora.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const body = {
        hora: formattedHora,
        descripcion: updatedDescripcion,
      };

      const response = await fetch(
        `https://localhost:7050/api/Citas/${cita.idCita}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setIsEditing(false);

      // Mostrar alerta de éxito
      setAlert({
        type: "success",
        message: "¡Cita actualizada correctamente!",
        visible: true,
      });
    } catch (error) {
      console.error("Error al actualizar la cita:", error);

      // Mostrar alerta de error
      setAlert({
        type: "error",
        message: "Hubo un error al guardar los cambios.",
        visible: true,
      });
    }
  };

  // Función para actualizar el estado en el servidor
  const handleActualizarEstado = async (nuevoEstado) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:7050/api/Citas/${cita.idCita}/estado`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoEstado),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Actualizamos el estado local para reflejar el cambio
      setEstadoCita(nuevoEstado);
      setAlert({
        type: "success",
        message: `El estado ha sido actualizado a '${nuevoEstado}'.`,
        visible: true,
      });

      // Llamar a onActualizacion si está definido
      if (typeof onActualizacion === "function") onActualizacion();
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      setAlert({
        type: "error",
        message: "Error al actualizar el estado de la cita.",
        visible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = async () => {
    setModalVisible(true);
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7050/api/Usuarios/${cita.idUsuario}`
      );
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setDetalleUsuario(data);
    } catch (error) {
      console.error("Error en la llamada al endpoint:", error);
      setDetalleUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setDetalleUsuario(null);
  };

  const getEstadoStyles = (estado) => {
    switch (estado) {
      case "aprobado":
        return { backgroundColor: "rgba(76, 175, 80, 0.2)", color: "#4caf50" };
      case "pendiente":
        return { backgroundColor: "rgba(25, 118, 210, 0.2)", color: "#1976d2" };
      case "rechazado":
        return { backgroundColor: "rgba(244, 67, 54, 0.2)", color: "#f44336" };
      default:
        return { backgroundColor: "#f0f0f0", color: "#000" };
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
        position: "relative",
      }}
    >
      {alert.visible && (
        <Stack sx={{ width: "100%", mb: 2 }} spacing={2}>
          <Alert
            severity={alert.type}
            action={
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Button
                  size="small"
                  onClick={() => setAlert({ ...alert, visible: false })}
                  style={{
                    fontSize: "12px",
                    color: "#1976d2",
                    border: "1px solid #1976d2",
                  }}
                >
                  Cerrar
                </Button>
              </Box>
            }
          >
            <AlertTitle>
              {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
            </AlertTitle>
            {alert.message}
          </Alert>
        </Stack>
      )}

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

      <Box className={`modal-overlay ${modalVisible ? "show" : "hide"}`}>
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

        <Box
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          <Chip
            size="small"
            label={`Marca: ${cita.marca}`}
            style={{ backgroundColor: "rgba(255, 193, 7, 0.2)", color: "#333" }}
          />
          <Chip
            size="small"
            label={`Modelo: ${cita.modelo}`}
            style={{ backgroundColor: "rgba(255, 193, 7, 0.2)", color: "#333" }}
          />
          <Chip
            size="small"
            label={`Año: ${cita.anho}`}
            style={{ backgroundColor: "rgba(255, 193, 7, 0.2)", color: "#333" }}
          />
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          {" "}
          {/* Usamos <Box> en lugar de Typography */}
          <Typography variant="body1" component="span" fontWeight="bold">
            Hora:
          </Typography>
          {isEditing ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                value={updatedHora}
                onChange={(newValue) => setUpdatedHora(newValue)}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          ) : (
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
              {updatedHora.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          )}
        </Box>

        <Box display="flex" flexDirection="column" mt={1}>
          <Typography variant="body1" component="span" fontWeight="bold">
            Descripción:
          </Typography>
          {isEditing ? (
            <TextField
              value={updatedDescripcion}
              onChange={(e) => setUpdatedDescripcion(e.target.value)}
              size="small"
              fullWidth
            />
          ) : (
            <Typography variant="body1" component="span" sx={{ mt: 1 }}>
              {updatedDescripcion}
            </Typography>
          )}
        </Box>

        <Box
          style={{
            display: "inline-block",
            padding: "4px 8px",
            borderRadius: "4px",
            marginTop: "10px",
            fontWeight: "bold",
            ...getEstadoStyles(estadoCita),
          }}
        >
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Estado: {estadoCita}
          </Typography>
        </Box>
      </CardContent>

      <Box
        style={{
          display: "flex",
          justifyContent: isEditing ? "space-between" : "space-around",
          marginTop: "15px",
        }}
      >
        {isEditing ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelEdit}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              style={{
                borderColor: botonesDeshabilitados ? "#ccc" : "#4caf50",
                color: botonesDeshabilitados ? "#aaa" : "#4caf50",
                backgroundColor: botonesDeshabilitados
                  ? "#f9f9f9"
                  : "transparent",
                margin: "0 5px",
              }}
              disabled={botonesDeshabilitados || isLoading}
              onClick={() => handleActualizarEstado("aprobado")}
            >
              Aprobar
            </Button>

            <Button
              variant="outlined"
              style={{
                borderColor: estadoCita !== "pendiente" ? "#ccc" : "#1976d2",
                color: estadoCita !== "pendiente" ? "#aaa" : "#1976d2",
                backgroundColor:
                  estadoCita !== "pendiente" ? "#f9f9f9" : "transparent",
                margin: "0 5px",
              }}
              disabled={estadoCita !== "pendiente" || isLoading}
              onClick={handleEdit}
            >
              Modificar
            </Button>

            <Button
              variant="outlined"
              style={{
                borderColor: botonesDeshabilitados ? "#ccc" : "#f44336",
                color: botonesDeshabilitados ? "#aaa" : "#f44336",
                backgroundColor: botonesDeshabilitados
                  ? "#f9f9f9"
                  : "transparent",
                margin: "0 5px",
              }}
              disabled={botonesDeshabilitados || isLoading}
              onClick={() => handleActualizarEstado("rechazado")}
            >
              Rechazar
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
}
