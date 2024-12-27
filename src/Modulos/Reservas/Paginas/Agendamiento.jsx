import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Calendario from "../Componentes/Calendario";
import DetalleAgendamiento from "../Componentes/DetalleAgendamiento";
import LeyendaEstados from "../Componentes/LeyendaEstados";
import AccionesReservas from "../Componentes/AccionesReservas";
import ModalReservar from "../Componentes/ModalReservar";
import EventNoteIcon from "@mui/icons-material/EventNote";
import dayjs from "dayjs";
import { obtenerCitasPorFechaYUsuario } from "../Services/citasService"; // Importar el servicio

const Agendamiento = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [citas, setCitas] = useState([]);
  const [modalMode, setModalMode] = useState("crear"); // "crear" o "editar"
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const idUsuario = 2; // Usuario fijo, reemplazar según la lógica de autenticación

  // Cargar citas desde el backend
  const cargarCitas = async (fecha, idUsuario) => {
    try {
      const data = await obtenerCitasPorFechaYUsuario(fecha, idUsuario); // Llamada al servicio
      setCitas(data); // Actualizar las citas en el estado
    } catch (error) {
      console.error("Error al cargar las citas:", error);
      setCitas([]); // Vaciar las citas en caso de error
    }
  };

  // Llamar a cargarCitas cuando cambia la fecha seleccionada
  useEffect(() => {
    cargarCitas(fechaSeleccionada, idUsuario);
  }, [fechaSeleccionada]);

  // Función para manejar el cambio de fecha
  const manejarCambioDeFecha = (nuevaFecha) => {
    setFechaSeleccionada(
      nuevaFecha
        ? nuevaFecha.format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD")
    );
  };

  const guardarCita = (detalleCita) => {
    setCitas((prevCitas) => [...prevCitas, detalleCita]); // Agregar la cita al estado
    setModalOpen(false); // Cerrar el modal
  };

  const manejarEditarCita = (cita) => {
    setModalMode("editar");
    setCitaSeleccionada(cita);
    setModalOpen(true);
  };

  const actualizarCita = () => {
    cargarCitas(fechaSeleccionada, idUsuario); // Recargar las citas
    setModalMode("crear");
    setCitaSeleccionada(null);
  };

  const eliminarCitaLocalmente = (idCita) => {
    setCitas((prevCitas) => prevCitas.filter((cita) => cita.idCita !== idCita));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          backgroundColor: "#558b2f",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: "bold", letterSpacing: "1.5px" }}
        >
          Agenda de Mantenimiento
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#dce775", marginTop: "10px", fontStyle: "italic" }}
        >
          Organiza y visualiza todas tus citas con facilidad.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Calendario
            value={dayjs(fechaSeleccionada)}
            manejarCambioDeFecha={manejarCambioDeFecha}
          />
          <LeyendaEstados />
          <AccionesReservas
            onReservar={() => {
              setModalMode("crear");
              setModalOpen(true);
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {citas.length > 0 ? (
            <DetalleAgendamiento
              citas={citas}
              onModificar={manejarEditarCita}
              onEliminarCita={eliminarCitaLocalmente}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
                minHeight: "200px",
              }}
            >
              <EventNoteIcon
                sx={{
                  fontSize: "50px",
                  color: "#bdbdbd",
                  marginBottom: "10px",
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: "#757575", fontWeight: "bold" }}
              >
                No hay citas para esta fecha
              </Typography>
              <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
                Selecciona otra fecha o crea una nueva cita para comenzar.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <ModalReservar
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalMode("crear");
        }}
        onGuardar={guardarCita}
        onActualizar={actualizarCita}
        selectedDate={dayjs(fechaSeleccionada)}
        mode={modalMode}
        cita={citaSeleccionada}
      />
    </Box>
  );
};

export default Agendamiento;
