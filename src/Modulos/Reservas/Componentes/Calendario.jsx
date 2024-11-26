import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importar el idioma español

const Calendario = ({ onDateChange }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const manejarCambioDeFecha = (nuevaFecha) => {
    setFechaSeleccionada(nuevaFecha);
    if (onDateChange) {
      onDateChange(nuevaFecha);
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es" // Configurar el idioma en español
    >
      <DateCalendar
        onChange={(newValue) => onDateChange(newValue)}
        sx={{
          backgroundColor: "#e8f5e9", 
          borderRadius: "8px",
          padding: 2,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendario;
