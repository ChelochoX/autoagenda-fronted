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

  const [originalHora, setOriginalHora] = useState(
    new Date(`1970-01-01T${cita.hora}`)
  );
  const [originalDescripcion, setOriginalDescripcion] = useState(
    cita.descripcion
  );

  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  const handleEdit = () => {
    setOriginalHora(updatedHora);
    setOriginalDescripcion(updatedDescripcion);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setUpdatedHora(originalHora);
    setUpdatedDescripcion(originalDescripcion);
    setIsEditing(false);

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

      setAlert({
        type: "success",
        message: "¡Cita actualizada correctamente!",
        visible: true,
      });
    } catch (error) {
      console.error("Error al actualizar la cita:", error);

      setAlert({
        type: "error",
        message: "Hubo un error al guardar los cambios.",
        visible: true,
      });
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
              <Button
                size="small"
                onClick={() => setAlert({ ...alert, visible: false })}
              >
                Cerrar
              </Button>
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

        <Box>
          <Typography variant="body1" component="span">
            <strong>Hora:</strong>{" "}
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
            updatedHora.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          )}
        </Box>

        <Box style={{ marginTop: "10px" }}>
          <Typography variant="body1" component="span">
            <strong>Descripción:</strong>{" "}
          </Typography>
          {isEditing ? (
            <TextField
              value={updatedDescripcion}
              onChange={(e) => setUpdatedDescripcion(e.target.value)}
              size="small"
              fullWidth
            />
          ) : (
            updatedDescripcion
          )}
        </Box>

        <Box
          style={{
            display: "inline-block",
            padding: "4px 8px",
            borderRadius: "4px",
            marginTop: "10px",
            fontWeight: "bold",
            ...getEstadoStyles(cita.estado),
          }}
        >
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            Estado: {cita.estado}
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
              onClick={handleEdit}
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
          </>
        )}
      </Box>
    </Card>
  );
}
