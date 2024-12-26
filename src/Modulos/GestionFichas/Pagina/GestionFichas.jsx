import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { crearFichaTecnica } from "../Services/fichaService"; // Servicio para crear ficha técnica
import FichaForm from "../Componentes/FichaForm"; // Formulario de ficha técnica
import { Box, CircularProgress, Typography, Alert } from "@mui/material";

const GestionFichas = () => {
  const location = useLocation();
  const { idCita: idCitaFromState } = location.state || {}; // Intentar obtener idCita desde el estado
  const { idCita: idCitaFromParams } = useParams(); // Intentar obtener idCita desde los parámetros de la URL

  const idCita = idCitaFromState || idCitaFromParams; // Usar el que esté disponible

  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const crearFicha = async () => {
      if (!idCita) {
        console.error("El parámetro idCita no fue proporcionado.");
        setError("No se puede crear la ficha técnica sin un ID de cita.");
        setLoading(false);
        return;
      }

      try {
        const fichaTecnicaDTO = await crearFichaTecnica({
          idCita,
          kilometrajeIngreso: 0,
          kilometrajeProximo: 0,
          detallesServicio: "",
          mecanicoResponsable: "",
        });

        // Solo guarda si no es una llamada cancelada
        setFicha(fichaTecnicaDTO);
      } catch (err) {
        console.error("Error al crear la ficha técnica:", err);
        setError("Hubo un error al crear la ficha técnica.");
      } finally {
        setLoading(false);
      }
    };

    if (!ficha) {
      crearFicha(); // Solo llama si `ficha` no existe aún
    }
  }, [idCita, ficha]); // Añade `ficha` como dependencia

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography>Cargando ficha técnica...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <FichaForm ficha={ficha} />
    </Box>
  );
};

export default GestionFichas;
