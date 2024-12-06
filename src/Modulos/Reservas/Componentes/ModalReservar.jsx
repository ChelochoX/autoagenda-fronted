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
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

const ModalReservar = ({ open, onClose, onGuardar, selectedDate }) => {
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

  // Cargar tipos de servicio
  useEffect(() => {
    if (open) {
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
          console.error("Error al cargar tipos de servicio:", error);
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
  }, [open, selectedDate]);

  // Cargar modelos dinámicamente cuando cambia la marca seleccionada
  useEffect(() => {
    if (marcaSeleccionada) {
      fetch(`https://localhost:7050/api/Vehiculos/modelos/${marcaSeleccionada}`)
        .then((response) => {
          if (!response.ok) throw new Error("Error al cargar los modelos");
          return response.json();
        })
        .then((data) => setModelos(data))
        .catch((error) => console.error("Error al cargar modelos:", error));
    } else {
      setModelos([]); // Limpiar modelos si no hay marca seleccionada
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
        IdTipoServicio: servicio,
        Descripcion: descripcion,
        Estado: "pendiente",
        IdCliente: 1,
      };

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
        throw new Error(
          detalleCita.mensaje || "Error al obtener detalles de la cita"
        );
      }

      console.log("detalles de la cita", detalleCita);

      alert("Cita creada exitosamente. ID de Cita: " + citaData.idCita);
      onGuardar(detalleCita);
      handleClose();
      onClose();
    } catch (error) {
      alert("Ocurrió un error al guardar los datos. Intente nuevamente.");
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px 0",
        }}
      >
        <DialogTitle sx={{ flex: 1, padding: 0 }}>
          Reservar Nueva Cita
        </DialogTitle>
        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#558b2f", lineHeight: 1 }}
          >
            {formatoDia}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textTransform: "capitalize", color: "#8e8e8e" }}
          >
            {formatoMesAnio}
          </Typography>
        </Box>
      </Box>

      <DialogContent>
        {/* Combo Box de Tipo de Servicio */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Tipo de Servicio</InputLabel>
          <Select
            value={servicio}
            onChange={(e) => {
              setServicio(e.target.value);
            }}
            label="Tipo de Servicio"
            disabled={errorServicios || tiposServicio.length === 0}
          >
            {errorServicios ? (
              <MenuItem disabled>
                Error al cargar los tipos de servicio
              </MenuItem>
            ) : tiposServicio.length === 0 ? (
              <MenuItem disabled>Cargando servicios...</MenuItem>
            ) : (
              tiposServicio.map((tipo) => (
                <MenuItem key={tipo.idTipoServicio} value={tipo.idTipoServicio}>
                  {tipo.nombre}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Group Box para Marca, Modelo y Año */}
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Vehículo
          </Typography>

          {/* Marca */}
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

          {/* Modelo */}
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

          {/* Año */}
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

        {/* TimePicker para seleccionar la hora */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Hora"
            value={hora}
            onChange={(newValue) => setHora(newValue)}
            sx={{ marginTop: 2, width: "100%" }}
          />
        </LocalizationProvider>

        {/* Campo de Descripción */}
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

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={guardarCita} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalReservar;
