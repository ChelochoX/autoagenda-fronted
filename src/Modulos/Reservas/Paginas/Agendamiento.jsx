import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Calendario from "../Componentes/Calendario";
import DetalleAgendamiento from "../Componentes/DetalleAgendamiento";
import LeyendaEstados from "../Componentes/LeyendaEstados";
import AccionesReservas from "../Componentes/AccionesReservas";
import ModalReservar from "../Componentes/ModalReservar";
import dayjs from "dayjs";

const Agendamiento = () => {
  const [modalOpen, setModalOpen] = useState(false); // Control del modal
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    dayjs().format("YYYY-MM-DD")
  ); // Fecha inicial
  const [citas, setCitas] = useState([]);

  const citasPorFecha = {
    "2024-11-26": [
      {
        hora: "08:00 AM",
        titulo: "Cambio de aceite",
        descripcion: "Revisión completa del motor",
        estado: "pendiente",
      },
      {
        hora: "09:00 AM",
        titulo: "Alineación",
        descripcion: "Alineación de ruedas y balanceo",
        estado: "aprobado",
      },
    ],
  };

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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, color: "#558b2f", textAlign: "center" }}
      >
        Agendamiento de Mantenimiento
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Calendario
            value={dayjs(fechaSeleccionada)} // Pasar la fecha seleccionada al calendario
            manejarCambioDeFecha={manejarCambioDeFecha}
          />
          <LeyendaEstados />
          <AccionesReservas onReservar={() => setModalOpen(true)} />{" "}
        </Grid>
        <Grid item xs={12} md={8}>
          <DetalleAgendamiento citas={citas} />
        </Grid>
      </Grid>

      <ModalReservar
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onGuardar={guardarCita}
        selectedDate={dayjs(fechaSeleccionada)}
      />
    </Box>
  );
};

export default Agendamiento;
