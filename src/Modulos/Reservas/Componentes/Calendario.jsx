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
        value={fechaSeleccionada}
        onChange={manejarCambioDeFechaInterno}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          "& .MuiPickersDay-root": {
            color: "#37474f", // Color del texto de los días
            fontWeight: "bold",
            borderRadius: "50%",
            transition: "all 0.3s ease",
          },
          "& .MuiPickersDay-root:hover": {
            backgroundColor: "#a5d6a7", // Fondo al pasar el cursor
            color: "#ffffff", // Texto al pasar el cursor
          },
          "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#66bb6a", // Fondo del día seleccionado
            color: "#ffffff", // Texto del día seleccionado
          },
          "& .MuiPickersDay-root.Mui-selected:hover": {
            backgroundColor: "#43a047", // Fondo del día seleccionado al pasar el cursor
          },
          "& .MuiTypography-root": {
            color: "#2e7d32", // Color del mes y año
          },
          "& .MuiPickersArrowSwitcher-button": {
            color: "#2e7d32", // Color de las flechas
            transition: "color 0.3s ease",
          },
          "& .MuiPickersArrowSwitcher-button:hover": {
            color: "#1b5e20", // Color de las flechas al pasar el cursor
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendario;
