import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importamos la localización en español
import ReservaCard from "../Componentes/ReservaCard";

export default function GestionReservas() {
  const [citas, setCitas] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const idUsuario = 2;

  const cargarCitas = async (fechaSeleccionada) => {
    const fechaFormateada = format(fechaSeleccionada, "yyyy-MM-dd");
    try {
      const response = await fetch(
        `https://localhost:7050/api/Citas/buscarcita?fecha=${fechaFormateada}&idUsuario=${idUsuario}`
      );
      if (response.ok) {
        const data = await response.json();
        setCitas(data);
      } else {
        setCitas([]);
      }
    } catch (error) {
      setCitas([]);
    }
  };

  useEffect(() => {
    cargarCitas(fecha);
  }, [fecha]);

  const handleAccion = (accion, cita) => {
    console.log(`Acción: ${accion} en la cita con ID: ${cita.id_cita}`);
  };

  return (
    <Paper
      elevation={4}
      style={{
        padding: 20,
        marginTop: 20,
        borderRadius: "10px",
        background: "#f9f9f9",
        maxWidth: "90%",
        margin: "20px auto",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{
              color: "#1976d2",
              fontWeight: "bold",
              paddingBottom: "10px",
              borderBottom: "2px solid #ddd",
            }}
          >
            Gestión de Reservas de Mantenimiento
          </Typography>
        </Grid>

        {/* Leyenda */}
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Box style={{ display: "flex", gap: "10px" }}>
            <Box
              style={{
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                color: "#4caf50",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              Aprobado
            </Box>
            <Box
              style={{
                backgroundColor: "rgba(25, 118, 210, 0.2)",
                color: "#1976d2",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              Pendiente
            </Box>
            <Box
              style={{
                backgroundColor: "rgba(244, 67, 54, 0.2)",
                color: "#f44336",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              Rechazado
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={es} // Aplicamos la localización en español
          >
            <DatePicker
              label="Seleccione una Fecha"
              value={fecha}
              onChange={(newValue) => setFecha(newValue)}
              format="dd/MM/yyyy"
              slotProps={{
                textField: {
                  fullWidth: false,
                  style: {
                    width: "300px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "#1976d2", fontWeight: "bold" }}
          >
            Lista de Reservas
          </Typography>
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "15px",
            }}
          >
            {citas.length > 0 ? (
              citas.map((cita, index) => (
                <ReservaCard
                  key={`cita-${index}`}
                  cita={cita}
                  onAccion={handleAccion}
                />
              ))
            ) : (
              <Typography>
                No hay reservas para la fecha seleccionada.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
