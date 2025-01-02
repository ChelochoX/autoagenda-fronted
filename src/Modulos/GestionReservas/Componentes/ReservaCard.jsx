import { useState } from "react";
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
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import {
  actualizarCita,
  actualizarEstadoCita,
  obtenerUsuarioPorId,
} from "../Services/fichasService";
import "../Estilos/ReservaCard.css";

export default function ReservaCard({ cita, onActualizacion }) {
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

  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const [estadoCita, setEstadoCita] = useState(cita.estado);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const botonesDeshabilitados = estadoCita !== "pendiente";

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setUpdatedHora(new Date(`1970-01-01T${cita.hora}`));
    setUpdatedDescripcion(cita.descripcion);
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

      const data = {
        hora: formattedHora,
        descripcion: updatedDescripcion,
      };

      await actualizarCita(cita.idCita, data);
      setIsEditing(false);

      setAlert({
        type: "success",
        message: "¡Cita actualizada correctamente!",
        visible: true,
      });

      if (onActualizacion) onActualizacion();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Hubo un error al guardar los cambios.",
        visible: true,
      });
    }
  };

  const handleActualizarEstado = async (nuevoEstado) => {
    try {
      await actualizarEstadoCita(cita.idCita, nuevoEstado); // Pasar el estado como string
      setEstadoCita(nuevoEstado);
      setAlert({
        type: "success",
        message: `Estado cambiado a ${nuevoEstado}.`,
        visible: true,
      });

      if (onActualizacion) onActualizacion();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Hubo un error al actualizar el estado.",
        visible: true,
      });
    }
  };

  const handleOpenModal = async () => {
    setModalVisible(true);
    setLoading(true);
    try {
      const usuario = await obtenerUsuarioPorId(cita.idUsuario);
      setDetalleUsuario(usuario);
    } catch (error) {
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
            flexWrap: "wrap",
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Box
            style={{
              display: "inline-block",
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: "bold",
              ...getEstadoStyles(estadoCita),
            }}
          >
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              Estado: {estadoCita}
            </Typography>
          </Box>

          {estadoCita === "aprobado" && (
            <IconButton
              onClick={() =>
                navigate(`/gestionfichas`, { state: { idCita: cita.idCita } })
              }
              style={{
                color: "#4caf50",
              }}
            >
              <DescriptionIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "10px",
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
              }}
              disabled={botonesDeshabilitados || isLoading}
              onClick={() => handleActualizarEstado("aprobado")}
            >
              {isLoading ? "Procesando..." : "Aprobar"}
            </Button>
            <Button
              variant="outlined"
              style={{
                borderColor: estadoCita !== "pendiente" ? "#ccc" : "#1976d2",
                color: estadoCita !== "pendiente" ? "#aaa" : "#1976d2",
                backgroundColor:
                  estadoCita !== "pendiente" ? "#f9f9f9" : "transparent",
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
