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
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ModalReservar = ({ open, onClose, onGuardar }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [vehiculo, setVehiculo] = useState("");
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Carga de datos desde el backend
  useEffect(() => {
    if (open) {
      // Cargar vehículos
      fetch("/api/vehiculos")
        .then((res) => res.json())
        .then((data) => setVehiculos(data))
        .catch((err) => console.error("Error cargando vehículos:", err));

      // Cargar servicios
      fetch("/api/tipos-servicio")
        .then((res) => res.json())
        .then((data) => setServicios(data))
        .catch((err) => console.error("Error cargando servicios:", err));
    }
  }, [open]);

  // Cargar horarios cuando se selecciona una fecha
  useEffect(() => {
    if (fecha) {
      fetch(`/api/horarios?fecha=${fecha.format("YYYY-MM-DD")}`)
        .then((res) => res.json())
        .then((data) => setHorarios(data))
        .catch((err) => console.error("Error cargando horarios:", err));
    }
  }, [fecha]);

  const guardarCita = () => {
    const nuevaCita = {
      id_vehiculo: vehiculo,
      fecha: fecha ? fecha.format("YYYY-MM-DD") : "",
      hora,
      id_tipo_servicio: servicio,
      descripcion,
      estado: "pendiente", // Por defecto
    };

    onGuardar(nuevaCita); // Guardar la cita
    onClose(); // Cerrar el modal
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reservar Nueva Cita</DialogTitle>
      <DialogContent>
        {/* Selector de Vehículo */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Vehículo</InputLabel>
          <Select
            value={vehiculo}
            onChange={(e) => setVehiculo(e.target.value)}
            label="Vehículo"
          >
            {vehiculos.map((v) => (
              <MenuItem key={v.id_vehiculo} value={v.id_vehiculo}>
                {v.marca} {v.modelo} ({v.placa})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de Fecha */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha"
            value={fecha}
            onChange={(newValue) => setFecha(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>

        {/* Selector de Hora */}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel>Hora</InputLabel>
          <Select
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            label="Hora"
          >
            {horarios.map((h, index) => (
              <MenuItem key={index} value={h}>
                {h}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Selector de Servicio */}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel>Servicio</InputLabel>
          <Select
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            label="Servicio"
          >
            {servicios.map((s) => (
              <MenuItem key={s.id_tipo_servicio} value={s.id_tipo_servicio}>
                {s.nombre} (Costo: ${s.costo})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Descripción */}
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
