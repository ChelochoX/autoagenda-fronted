import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/es";

const Calendario = ({ value, manejarCambioDeFecha }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(value); // Inicializa con la fecha pasada como prop

  useEffect(() => {
    setFechaSeleccionada(value); // Actualiza la fecha cuando cambia la prop `value`
  }, [value]);

  const manejarCambioDeFechaInterno = (nuevaFecha) => {
    setFechaSeleccionada(nuevaFecha);
    manejarCambioDeFecha(nuevaFecha);
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es" // Configurar el idioma en español
    >
      <DateCalendar
        value={fechaSeleccionada} // Muestra la fecha seleccionada
        onChange={manejarCambioDeFechaInterno}
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
