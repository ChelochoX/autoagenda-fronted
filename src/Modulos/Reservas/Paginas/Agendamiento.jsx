import React, { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Calendario from "../Componentes/Calendario";
import DetalleAgendamiento from "../Componentes/DetalleAgendamiento";
import LeyendaEstados from "../Componentes/LeyendaEstados";
import AccionesReservas from "../Componentes/AccionesReservas";

const Agendamiento = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const citasPorFecha = {
    "2024-11-26": [
      { hora: "08:00 AM", titulo: "Cambio de aceite", descripcion: "Revisión completa del motor", estado: "pendiente" },
      { hora: "09:00 AM", titulo: "Alineación", descripcion: "Alineación de ruedas y balanceo", estado: "aprobado" },
      { hora: "10:00 AM", titulo: "Cambio de frenos", descripcion: "Revisión de frenos traseros", estado: "rechazado" },
      { hora: "11:00 AM", titulo: "Rotación de neumáticos", descripcion: "Rotación para balanceo", estado: "pendiente" },
      { hora: "12:00 PM", titulo: "Diagnóstico del motor", descripcion: "Revisión de fallos en encendido", estado: "aprobado" },
      { hora: "01:00 PM", titulo: "Revisión de líquidos", descripcion: "Nivel de aceite y anticongelante", estado: "rechazado" },
      { hora: "02:00 PM", titulo: "Cambio de bujías", descripcion: "Bujías del motor", estado: "pendiente" },
      { hora: "03:00 PM", titulo: "Lavado del vehículo", descripcion: "Limpieza interna y externa", estado: "rechazado" },
      { hora: "04:00 PM", titulo: "Cambio de batería", descripcion: "Instalación de batería nueva", estado: "aprobado" },
      { hora: "05:00 PM", titulo: "Revisión de aire acondicionado", descripcion: "Carga de gas", estado: "pendiente" },
      { hora: "06:00 PM", titulo: "Inspección de cinturones", descripcion: "Verificación de desgaste", estado: "rechazado" },
      { hora: "07:00 PM", titulo: "Prueba de suspensión", descripcion: "Evaluación de amortiguadores", estado: "pendiente" },
      { hora: "08:00 PM", titulo: "Alineación de luces", descripcion: "Calibración de faros delanteros", estado: "aprobado" },
      { hora: "09:00 PM", titulo: "Cambio de aceite diferencial", descripcion: "Revisión del diferencial trasero", estado: "pendiente" },
      { hora: "10:00 PM", titulo: "Revisión del radiador", descripcion: "Limpieza del sistema", estado: "rechazado" },
      { hora: "11:00 PM", titulo: "Prueba de emisión", descripcion: "Chequeo de emisiones", estado: "aprobado" },
      { hora: "11:30 PM", titulo: "Chequeo eléctrico", descripcion: "Revisión de fusibles", estado: "pendiente" },
      { hora: "11:45 PM", titulo: "Limpieza de inyectores", descripcion: "Optimización de inyección", estado: "rechazado" },
      { hora: "11:55 PM", titulo: "Verificación de software", descripcion: "Actualización de sistemas", estado: "aprobado" },
      { hora: "12:00 AM", titulo: "Revisión general", descripcion: "Chequeo de todos los sistemas", estado: "pendiente" },
    ],
  };
  

  const manejarCambioDeFecha = (nuevaFecha) => {
    setFechaSeleccionada(nuevaFecha ? nuevaFecha.format("YYYY-MM-DD") : null);
  };

  const citas = citasPorFecha[fechaSeleccionada] || [];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#558b2f" }}>
        Agendamiento de Mantenimiento
      </Typography>
      <Grid container spacing={2}>
        {/* Columna del Calendario */}
        <Grid item xs={12} md={4}>
          <Calendario onDateChange={manejarCambioDeFecha} />
          {/* Leyenda de Estados */}
          <LeyendaEstados />
          <AccionesReservas />
        </Grid>
        {/* Columna de Detalles del Agendamiento */}
        <Grid item xs={12} md={8}>
          <DetalleAgendamiento citas={citas} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Agendamiento;
