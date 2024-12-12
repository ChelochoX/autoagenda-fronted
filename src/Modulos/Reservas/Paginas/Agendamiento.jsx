import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Calendario from "../Componentes/Calendario";
import DetalleAgendamiento from "../Componentes/DetalleAgendamiento";
import LeyendaEstados from "../Componentes/LeyendaEstados";
import AccionesReservas from "../Componentes/AccionesReservas";
import ModalReservar from "../Componentes/ModalReservar";
import EventNoteIcon from "@mui/icons-material/EventNote";
import dayjs from "dayjs";

const Agendamiento = () => {
  const [modalOpen, setModalOpen] = useState(false); // Control del modal
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    dayjs().format("YYYY-MM-DD")
  ); // Fecha inicial
  const [citas, setCitas] = useState([]);
  const [modalMode, setModalMode] = useState("crear"); // "crear" o "editar"
  const [citaSeleccionada, setCitaSeleccionada] = useState(null); // Cita a editar

  const idUsuario = 2;

  // Función para obtener citas desde el backend
  const cargarCitas = async (fecha, idUsuario) => {
    try {
      const response = await fetch(
        `https://localhost:7050/api/Citas/buscarcita?fecha=${fecha}&idUsuario=${idUsuario}`
      );

      if (response.status === 404) {
        // Si el servidor retorna un 404 (sin datos), vaciamos las citas
        setCitas([]);
        return;
      }

      if (!response.ok) {
        // Para otros errores (500, etc.), lanzar una excepción
        throw new Error("Error al cargar las citas");
      }

      // Si la respuesta es válida, actualizamos las citas
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      setCitas([]);
    }
  };

  // Llamar a cargarCitas cada vez que cambia la fecha seleccionada
  useEffect(() => {
    cargarCitas(fechaSeleccionada, idUsuario);
  }, [fechaSeleccionada]);

  const manejarCambioDeFecha = (nuevaFecha) => {
    setFechaSeleccionada(
      nuevaFecha
        ? nuevaFecha.format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD")
    );
  };

  const guardarCita = (detalleCita) => {
    setCitas((prevCitas) => [...prevCitas, detalleCita]); // Agregar la cita recién creada al estado
    setModalOpen(false); // Cerrar el modal
  };

  // Función para abrir el modal en modo editar
  const manejarEditarCita = (cita) => {
    setModalMode("editar"); // Cambiar el modo a "editar"
    setCitaSeleccionada(cita); // Establecer la cita seleccionada
    setModalOpen(true); // Abrir el modal
  };

  const actualizarCita = () => {
    cargarCitas(fechaSeleccionada, idUsuario); // Recargar las citas
    setModalMode("crear"); // Resetear el modo del modal
    setCitaSeleccionada(null); // Limpiar la cita seleccionada
  };

  // Función para eliminar una cita localmente
  const eliminarCitaLocalmente = (idCita) => {
    setCitas((prevCitas) => prevCitas.filter((cita) => cita.idCita !== idCita));
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Descripción Principal con estilo */}
      <Box
        sx={{
          backgroundColor: "#558b2f", // Fondo verde oscuro
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para destacar
          textAlign: "center", // Centrar texto
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white", // Texto blanco
            fontWeight: "bold", // Negrita
            letterSpacing: "1.5px", // Espaciado entre letras
          }}
        >
          Agenda de Mantenimiento
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#dce775", // Texto amarillo suave
            marginTop: "10px",
            fontStyle: "italic", // Estilo cursiva
          }}
        >
          Organiza y visualiza todas tus citas con facilidad.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Calendario
            value={dayjs(fechaSeleccionada)} // Pasar la fecha seleccionada al calendario
            manejarCambioDeFecha={manejarCambioDeFecha}
          />
          <LeyendaEstados />
          <AccionesReservas
            onReservar={() => {
              setModalMode("crear"); // Siempre establece el modo en "crear" al reservar
              setModalOpen(true); // Abre el modal
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {citas.length > 0 ? (
            <DetalleAgendamiento
              citas={citas} // Pasar todo el array de citas
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
                backgroundColor: "#f0f0f0", // Gris claro
                padding: "20px",
                borderRadius: "8px",
                minHeight: "200px",
              }}
            >
              <EventNoteIcon
                sx={{
                  fontSize: "50px",
                  color: "#bdbdbd", // Gris oscuro
                  marginBottom: "10px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#757575", // Gris medio
                  fontWeight: "bold",
                }}
              >
                No hay citas para esta fecha
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#9e9e9e", // Gris claro
                }}
              >
                Selecciona otra fecha o crea una nueva cita para comenzar.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      <ModalReservar
        open={modalOpen}
        onClose={() => {
          setModalOpen(false); // Cierra el modal
          setModalMode("crear"); // Resetear el modo al cerrar
        }}
        onGuardar={guardarCita}
        onActualizar={actualizarCita}
        selectedDate={dayjs(fechaSeleccionada)}
        mode={modalMode} // Pasamos el modo al modal
        cita={citaSeleccionada} // Pasamos la cita seleccionada
      />
    </Box>
  );
};

export default Agendamiento;
