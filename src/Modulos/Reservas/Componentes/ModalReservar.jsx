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
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const ModalReservar = ({
  open,
  onClose,
  onGuardar,
  onActualizar, // AGREGADO: Callback para actualizar una cita
  selectedDate,
  mode = "crear", // AGREGADO: Define si el modal está en modo "crear" o "editar"
  cita = null, // AGREGADO: Datos de la cita seleccionada para editar
}) => {
  const [fecha, setFecha] = useState(selectedDate || null);
  const [hora, setHora] = useState(null);
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tiposServicio, setTiposServicio] = useState([]);
  const [errorServicios, setErrorServicios] = useState(false);

  // Estados para marca, modelo y año
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anhos, setAnhos] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [modeloSeleccionado, setModeloSeleccionado] = useState("");
  const [anhoSeleccionado, setAnhoSeleccionado] = useState("");

  // Prellenar datos si estamos en modo "editar" y se selecciona una cita
  useEffect(() => {
    if (mode === "editar" && cita) {
      // MODIFICADO
      setFecha(dayjs(cita.fecha));
      setHora(dayjs(cita.hora, "HH:mm"));
      setServicio(cita.tipoServicio);
      setDescripcion(cita.descripcion);
      setMarcaSeleccionada(cita.marca);
      setModeloSeleccionado(cita.modelo);
      setAnhoSeleccionado(cita.anho);
    }
  }, [mode, cita]); // MODIFICADO

  // Cargar tipos de servicio
  useEffect(() => {
    if (open && mode === "crear") {
      setFecha(selectedDate || dayjs());

      fetch("https://localhost:7050/api/TipoServicios/tiposservicios")
        .then((response) => {
          if (!response.ok)
            throw new Error("Error al cargar los tipos de servicio");
          return response.json();
        })
        .then((data) => {
          setTiposServicio(data);
          setErrorServicios(false);
        })
        .catch((error) => {
          setErrorServicios(true);
        });

      // Cargar marcas
      fetch("https://localhost:7050/api/Vehiculos/marcas")
        .then((response) => {
          if (!response.ok) throw new Error("Error al cargar las marcas");
          return response.json();
        })
        .then((data) => setMarcas(data))
        .catch((error) => console.error("Error al cargar marcas:", error));

      // Cargar años
      fetch("https://localhost:7050/api/Vehiculos/anhos")
        .then((response) => {
          if (!response.ok) throw new Error("Error al cargar los años");
          return response.json();
        })
        .then((data) => setAnhos(data))
        .catch((error) => console.error("Error al cargar años:", error));
    }
  }, [open, selectedDate, mode]);

  // Cargar modelos dinámicamente cuando cambia la marca seleccionada
  useEffect(() => {
    // Verificar si marcaSeleccionada es un número válido antes de llamar a la API
    const isIdValido =
      !isNaN(marcaSeleccionada) && Number(marcaSeleccionada) > 0;

    if (isIdValido) {
      fetch(`https://localhost:7050/api/Vehiculos/modelos/${marcaSeleccionada}`)
        .then((response) => {
          if (!response.ok) throw new Error("Error al cargar los modelos");
          return response.json();
        })
        .then((data) => setModelos(data))
        .catch((error) => console.error("Error al cargar modelos:", error));
    } else {
      // Si no es un ID válido, limpiar los modelos
      setModelos([]);
    }
  }, [marcaSeleccionada]);

  // Guardamos la Cita ingresada por el usuario
  const guardarCita = async () => {
    // Validar si los campos obligatorios están llenos
    if (
      !marcaSeleccionada ||
      !modeloSeleccionado ||
      !anhoSeleccionado ||
      !fecha ||
      !hora ||
      !servicio
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Crear el objeto del vehículo
    const nuevoVehiculo = {
      idMarca: marcaSeleccionada,
      idModelo: modeloSeleccionado,
      idAnho: anhoSeleccionado,
      placa: "SIN-PLACA",
    };

    try {
      // Paso 1: Insertar el vehículo
      const vehiculoResponse = await fetch(
        "https://localhost:7050/api/Vehiculos/crear",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoVehiculo),
        }
      );

      const vehiculoData = await vehiculoResponse.json();
      if (!vehiculoResponse.ok) {
        throw new Error(vehiculoData.mensaje || "Error al guardar el vehículo");
      }

      const idVehiculo = vehiculoData.idVehiculo;

      // Crear el objeto de la cita
      const nuevaCita = {
        IdVehiculo: idVehiculo,
        Fecha: fecha ? fecha.format("YYYY-MM-DD") : "",
        Hora: hora ? hora.format("HH:mm") : "",
        IdTipoServicio: tiposServicio.find((tipo) => tipo.nombre === servicio)
          ?.idTipoServicio,
        Descripcion: descripcion,
        Estado: "pendiente",
        IdCliente: 1,
      };

      console.log(nuevaCita);

      // Paso 2: Insertar la cita
      const citaResponse = await fetch(
        "https://localhost:7050/api/Citas/crear",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevaCita),
        }
      );

      const citaData = await citaResponse.json();

      if (!citaResponse.ok) {
        throw new Error(citaData.mensaje || "Error al guardar la cita");
      }

      // Paso 3: Obtener los detalles de la cita recién creada
      const detalleResponse = await fetch(
        `https://localhost:7050/api/Citas/${citaData.idCita}`
      );
      const detalleCita = await detalleResponse.json();

      if (!detalleResponse.ok) {
        const errorData = await citaResponse.json();
        throw new Error(errorData.mensaje || "Error al guardar la cita");
      }

      onGuardar(detalleCita);
      handleClose();
      onClose();
    } catch (error) {
      alert("Ocurrió un error al guardar los datos. Intente nuevamente.");
    }
  };

  // Actualizar una cita existente
  const actualizarCita = async () => {
    if (!cita || !cita.idCita) {
      console.error("No hay cita válida para actualizar.");
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7050/api/Citas/${cita.idCita}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hora: hora ? hora.format("HH:mm") : null,
            descripcion: descripcion || "",
          }),
        }
      );

      const citaActualizada = await response.json();
      if (!response.ok) {
        throw new Error("Error al actualizar la cita");
      }

      alert("Cita actualizada exitosamente");

      if (onActualizar) {
        onActualizar(); // Notifica al padre sobre la actualización
      }

      resetFields();
      onClose(); // Cierra el modal
    } catch (error) {
      alert("Ocurrió un error al actualizar la cita. Intente nuevamente.");
    }
  };

  // Formato de fecha estilizado
  const formatoDia = fecha ? fecha.format("DD") : "--";
  const formatoMesAnio = fecha ? fecha.format("MMMM YYYY") : "Mes Año";

  // Función para limpiar los campos
  const resetFields = () => {
    setFecha(selectedDate || null);
    setHora(null);
    setServicio("");
    setDescripcion("");
    setMarcaSeleccionada("");
    setModeloSeleccionado("");
    setAnhoSeleccionado("");
    setModelos([]);
  };

  // Función para manejar el cierre del modal
  const handleClose = () => {
    resetFields(); // Limpiar los campos
    onClose(); // Cerrar el modal
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: mode === "editar" ? "#0288d1" : "#43a047",
          color: "#fff",
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle sx={{ flex: 1, padding: 0, fontWeight: "bold" }}>
          {mode === "editar" ? "Actualizar Cita" : "Reservar Nueva Cita"}
        </DialogTitle>
        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: "bold", lineHeight: 1 }}
          >
            {fecha?.format("DD") || "--"}
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {fecha?.format("MMMM YYYY") || "Mes Año"}
          </Typography>
        </Box>
      </Box>

      <DialogContent>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Tipo de Servicio */}
        {mode === "editar" ? (
          <TextField
            label="Tipo de Servicio"
            value={servicio || "No disponible"}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        ) : (
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Tipo de Servicio</InputLabel>
            <Select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              label="Tipo de Servicio"
              disabled={errorServicios || tiposServicio.length === 0}
            >
              {tiposServicio.map((tipo) => (
                <MenuItem key={tipo.idTipoServicio} value={tipo.nombre}>
                  {tipo.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Información del vehículo */}
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", marginBottom: 1 }}
          >
            Vehículo
          </Typography>

          {/* Marca */}
          {mode === "editar" ? (
            <TextField
              label="Marca"
              value={marcaSeleccionada}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          ) : (
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
          )}

          {/* Modelo */}
          {mode === "editar" ? (
            <TextField
              label="Modelo"
              value={modeloSeleccionado}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          ) : (
            <FormControl
              fullWidth
              sx={{ marginBottom: 2 }}
              disabled={!marcaSeleccionada}
            >
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
          )}

          {/* Año */}
          {mode === "editar" ? (
            <TextField
              label="Año"
              value={anhoSeleccionado}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          ) : (
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
          )}
        </Paper>

        {/* Hora y descripción */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Hora"
            value={hora}
            onChange={(newValue) => setHora(newValue)}
            sx={{ marginTop: 2, width: "100%" }}
          />
        </LocalizationProvider>
        <TextField
          label="Descripción"
          multiline
          rows={3}
          fullWidth
          sx={{ marginTop: 2 }}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </DialogContent>

      {/* Acciones */}
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          startIcon={<CancelIcon />}
        >
          Cancelar
        </Button>
        <Button
          onClick={mode === "editar" ? actualizarCita : guardarCita}
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
        >
          {mode === "editar" ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModalReservar;
