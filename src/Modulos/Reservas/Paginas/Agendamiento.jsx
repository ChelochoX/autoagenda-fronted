import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Calendario from "../Componentes/Calendario";
import DetalleAgendamiento from "../Componentes/DetalleAgendamiento";
import LeyendaEstados from "../Componentes/LeyendaEstados";
import AccionesReservas from "../Componentes/AccionesReservas";
import ModalReservar from "../Componentes/ModalReservar";

const Agendamiento = () => {
  const [modalOpen, setModalOpen] = useState(false); // Control del modal
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

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
      // Más citas...
    ],
  };

  const manejarCambioDeFecha = (nuevaFecha) => {
    setFechaSeleccionada(nuevaFecha ? nuevaFecha.format("YYYY-MM-DD") : null);
  };

  const guardarCita = (nuevaCita) => {
    console.log("Nueva cita creada:", nuevaCita);
    // Aquí puedes agregar lógica para enviar la cita al backend o actualizar el estado
    setModalOpen(false); // Cierra el modal
  };

  const citas = citasPorFecha[fechaSeleccionada] || [];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, color: "#558b2f", textAlign: "center" }}
      >
        Agendamiento de Mantenimiento
      </Typography>
      <Grid container spacing={2}>
        {/* Columna del Calendario */}
        <Grid item xs={12} md={4}>
          <Calendario onDateChange={manejarCambioDeFecha} />
          <LeyendaEstados />
          <AccionesReservas onReservar={() => setModalOpen(true)} />{" "}
          {/* Pasamos la función */}
        </Grid>
        {/* Columna de Detalles del Agendamiento */}
        <Grid item xs={12} md={8}>
          <DetalleAgendamiento citas={citas} />
        </Grid>
      </Grid>

      {/* Modal para reservar */}
      <ModalReservar
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onGuardar={guardarCita}
      />
    </Box>
  );
};

export default Agendamiento;
