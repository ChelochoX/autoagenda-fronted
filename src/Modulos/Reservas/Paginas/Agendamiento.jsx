import React, { useState, useEffect } from "react";
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
  const [modalMode, setModalMode] = useState("crear"); // "crear" o "editar"
  const [citaSeleccionada, setCitaSeleccionada] = useState(null); // Cita a editar

  const idCliente = 1;

  // Función para obtener citas desde el backend
  const cargarCitas = async (fecha, idCliente) => {
    try {
      const response = await fetch(
        `https://localhost:7050/api/Citas/buscarcita?fecha=${fecha}&idCliente=${idCliente}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setCitas([]); // Vaciar las citas si no se encuentran
        } else {
          throw new Error("Error al cargar las citas");
        }
      } else {
        const data = await response.json();
        setCitas(data); // Actualizar el estado con las citas obtenidas
      }
    } catch (error) {
      //setCitas([]); // En caso de error, vaciar el estado
    }
  };

  // Llamar a cargarCitas cada vez que cambia la fecha seleccionada
  useEffect(() => {
    cargarCitas(fechaSeleccionada, idCliente);
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
    cargarCitas(fechaSeleccionada, idCliente); // Recargar las citas
    setModalMode("crear"); // Resetear el modo del modal
    setCitaSeleccionada(null); // Limpiar la cita seleccionada
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
          <AccionesReservas
            onReservar={() => {
              setModalMode("crear"); // Siempre establece el modo en "crear" al reservar
              setModalOpen(true); // Abre el modal
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {citas.length > 0 ? (
            citas.map((cita) => (
              <DetalleAgendamiento
                key={cita.idCita}
                citas={citas}
                onModificar={manejarEditarCita}
              />
            ))
          ) : (
            <Typography>No hay citas para mostrar</Typography>
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
