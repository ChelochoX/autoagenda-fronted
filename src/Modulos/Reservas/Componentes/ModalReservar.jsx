import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

// Importar servicios
import {
  obtenerTiposServicios,
  obtenerMarcas,
  obtenerModelosPorMarca,
  obtenerAnhos,
  crearVehiculo,
  crearCitaConDetalles,
} from "../Services/citasService";

const ModalReservar = ({ open, onClose, onGuardar, selectedDate }) => {
  dayjs.locale("es");

  // Estados principales
  const [fecha, setFecha] = useState(selectedDate || dayjs());
  const [hora, setHora] = useState(null);

  // Estados para vehículo
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anhos, setAnhos] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [modeloSeleccionado, setModeloSeleccionado] = useState("");
  const [anhoSeleccionado, setAnhoSeleccionado] = useState("");

  // Estados para servicios
  const [tiposServicio, setTiposServicio] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [descripcionServicio, setDescripcionServicio] = useState("");
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  // Cargar datos iniciales al abrir el modal
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [servicios, marcas, anhos] = await Promise.all([
          obtenerTiposServicios(),
          obtenerMarcas(),
          obtenerAnhos(),
        ]);

        setTiposServicio(servicios || []);
        setMarcas(marcas || []);
        setAnhos(anhos || []);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };

    if (open) {
      cargarDatosIniciales();
    }
  }, [open]);

  // Cargar modelos dinámicamente al seleccionar una marca
  useEffect(() => {
    const cargarModelos = async () => {
      if (marcaSeleccionada) {
        try {
          const modelos = await obtenerModelosPorMarca(marcaSeleccionada);
          setModelos(modelos || []);
        } catch (error) {
          console.error("Error al cargar modelos:", error);
        }
      }
    };

    cargarModelos();
  }, [marcaSeleccionada]);

  // Agregar un servicio al listado
  const agregarServicio = () => {
    if (!servicioSeleccionado) {
      alert("Debe seleccionar un tipo de servicio.");
      return;
    }

    const servicio = tiposServicio.find(
      (tipo) => tipo.idTipoServicio === servicioSeleccionado
    );

    if (!servicio) {
      alert("El servicio seleccionado no es válido.");
      return;
    }

    // Validar que no se dupliquen servicios
    const existeServicio = serviciosSeleccionados.some(
      (item) => item.idTipoServicio === servicio.idTipoServicio
    );
    if (existeServicio) {
      alert("Este servicio ya ha sido agregado.");
      return;
    }

    setServiciosSeleccionados((prev) => [
      ...prev,
      {
        idTipoServicio: servicio.idTipoServicio,
        nombre: servicio.nombre,
        precio: servicio.costo || 0, // Mostrar costo del servicio
        descripcion: descripcionServicio || "",
      },
    ]);

    setServicioSeleccionado("");
    setDescripcionServicio("");
  };

  // Eliminar un servicio del listado
  const eliminarServicio = (index) => {
    setServiciosSeleccionados((prev) => prev.filter((_, i) => i !== index));
  };

  // Guardar la cita con detalles
  // Guardar la cita con detalles
  const guardarCita = async () => {
    if (
      !marcaSeleccionada ||
      !modeloSeleccionado ||
      !anhoSeleccionado ||
      !fecha ||
      !hora
    ) {
      alert("Debe completar todos los campos del vehículo y la cita.");
      return;
    }

    if (serviciosSeleccionados.length === 0) {
      alert("Debe agregar al menos un servicio.");
      return;
    }

    try {
      // Crear el vehículo
      const vehiculo = {
        idMarca: marcaSeleccionada,
        idModelo: modeloSeleccionado,
        idAnho: anhoSeleccionado,
        placa: "SIN-PLACA",
      };
      const vehiculoCreado = await crearVehiculo(vehiculo);

      // Crear la cita con detalles
      const citaConDetalles = {
        cita: {
          IdVehiculo: vehiculoCreado.idVehiculo,
          Fecha: fecha.format("YYYY-MM-DD"),
          Hora: hora.format("HH:mm"),
          Estado: "pendiente",
          IdUsuario: 2,
        },
        detallesCita: serviciosSeleccionados.map((servicio) => ({
          IdTipoServicio: servicio.idTipoServicio,
          Descripcion: servicio.descripcion,
          PrecioServicio: servicio.precio,
        })),
      };

      const respuesta = await crearCitaConDetalles(citaConDetalles);
      alert(respuesta?.mensaje || "Cita creada exitosamente.");
      onGuardar();
      onClose();
    } catch (error) {
      console.error("Error al guardar la cita:", error);
      alert("Ocurrió un error al guardar la cita.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md" // Aumentar ancho del modal
      fullWidth
    >
      {/* Header del Modal */}
      <Box
        sx={{
          backgroundColor: "#43a047",
          color: "#fff",
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle sx={{ flex: 1, padding: 0, fontWeight: "bold" }}>
          Reservar Nueva Cita
        </DialogTitle>
        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: "bold", lineHeight: 1 }}
          >
            {fecha.format("DD")}
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {fecha.format("MMMM YYYY")}
          </Typography>
        </Box>
      </Box>

      {/* Contenido del Modal */}
      <DialogContent>
        <Divider sx={{ mb: 2 }} />

        {/* Selección de Servicios */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Servicios Solicitados
          </Typography>

          {/* Selección de Tipo de Servicio */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Servicio</InputLabel>
            <Select
              value={servicioSeleccionado}
              onChange={(e) => setServicioSeleccionado(e.target.value)}
              label="Tipo de Servicio"
            >
              {tiposServicio.map((tipo) => (
                <MenuItem key={tipo.idTipoServicio} value={tipo.idTipoServicio}>
                  {`${tipo.nombre} - ${tipo.costo?.toLocaleString(
                    "es-PY"
                  )} Gs.`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Campo para agregar descripción del servicio */}
          <TextField
            label="Descripción del Servicio"
            value={descripcionServicio}
            onChange={(e) => setDescripcionServicio(e.target.value)}
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />

          {/* Botón para agregar servicio */}
          <Button variant="outlined" color="primary" onClick={agregarServicio}>
            Agregar Servicio
          </Button>

          {/* Listado de Servicios Solicitados */}
          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Servicios Solicitados
          </Typography>
          <List
            dense
            sx={{
              maxHeight: 150,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: 1,
            }}
          >
            {serviciosSeleccionados.length === 0 ? (
              <Typography
                variant="body2"
                sx={{ textAlign: "center", padding: 1, color: "#999" }}
              >
                No se han agregado servicios.
              </Typography>
            ) : (
              serviciosSeleccionados.map((servicio, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => eliminarServicio(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr auto",
                    gridTemplateRows: "auto auto",
                    alignItems: "center",
                    gap: "4px 16px",
                    padding: "8px 16px",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  {/* Nombre del servicio */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      gridColumn: "1 / span 3",
                      fontSize: "14px", // Tamaño reducido
                    }}
                  >
                    {servicio.nombre}
                  </Typography>

                  {/* Precio del servicio */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px", // Tamaño reducido
                      color: "#555",
                    }}
                  >
                    {`${servicio.precio.toLocaleString("es-PY")} Gs.`}
                  </Typography>

                  {/* Descripción del servicio */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px", // Tamaño reducido
                      color: "#777",
                      gridColumn: "1 / span 2", // Ocupar espacio horizontal completo
                      wordWrap: "break-word", // Permitir salto de línea para descripciones largas
                    }}
                  >
                    {servicio.descripcion || "Sin descripción"}
                  </Typography>
                </ListItem>
              ))
            )}
          </List>
        </Paper>

        {/* Información del Vehículo */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Vehículo
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Marca</InputLabel>
            <Select
              value={marcaSeleccionada}
              onChange={(e) => setMarcaSeleccionada(e.target.value)}
              label="Marca"
            >
              {marcas.map((marca) => (
                <MenuItem key={marca.idMarca} value={marca.idMarca}>
                  {marca.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Modelo</InputLabel>
            <Select
              value={modeloSeleccionado}
              onChange={(e) => setModeloSeleccionado(e.target.value)}
              label="Modelo"
            >
              {modelos.map((modelo) => (
                <MenuItem key={modelo.idModelo} value={modelo.idModelo}>
                  {modelo.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Año</InputLabel>
            <Select
              value={anhoSeleccionado}
              onChange={(e) => setAnhoSeleccionado(e.target.value)}
              label="Año"
            >
              {anhos.map((anho) => (
                <MenuItem key={anho.idAnho} value={anho.idAnho}>
                  {anho.anho}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {/* Hora */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Hora"
            value={hora}
            onChange={(newValue) => setHora(newValue)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </LocalizationProvider>
      </DialogContent>

      {/* Botones de Acción */}
      <DialogActions>
        <Button onClick={onClose} color="secondary" startIcon={<CancelIcon />}>
          Cancelar
        </Button>
        <Button
          onClick={guardarCita}
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalReservar;
