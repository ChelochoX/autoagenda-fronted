import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { obtenerFichaPorCita } from "../Services/fichaService"; // Solo usamos este servicio
import FichaForm from "../Componentes/FichaForm"; // Formulario de ficha técnica
import { Box, CircularProgress, Typography, Alert } from "@mui/material";

const GestionFichas = () => {
  const location = useLocation();
  const { idCita: idCitaFromState } = location.state || {}; // Obtener idCita desde el estado
  const { idCita: idCitaFromParams } = useParams(); // Obtener idCita desde los parámetros de la URL

  const idCita = idCitaFromState || idCitaFromParams; // Usar el valor que esté disponible

  // Estados
  const [ficha, setFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag para prevenir actualizaciones en componentes desmontados

    const cargarFicha = async () => {
      if (!idCita) {
        setError("No se puede cargar la ficha técnica sin un ID de cita.");
        setLoading(false);
        return;
      }

      try {
        // Llamada al servicio para obtener la ficha técnica
        const fichaExistente = await obtenerFichaPorCita(idCita);

        if (isMounted) {
          if (fichaExistente) {
            setFicha(fichaExistente); // Si existe la ficha, actualizar el estado
          } else {
            setError("No se encontró una ficha técnica para esta cita.");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("Hubo un error al cargar la ficha técnica.");
          console.error("Error al obtener la ficha técnica:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    cargarFicha();

    // Cleanup para evitar actualizaciones en componentes desmontados
    return () => {
      isMounted = false;
    };
  }, [idCita]);

  // Mostrar estado de carga
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography>Cargando ficha técnica...</Typography>
      </Box>
    );
  }

  // Mostrar mensaje de error
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  // Renderizar el formulario de ficha técnica si existe la ficha
  return (
    <Box sx={{ padding: "20px" }}>
      {ficha ? (
        <FichaForm ficha={ficha} />
      ) : (
        <Typography>No se encontró ninguna ficha técnica asociada.</Typography>
      )}
    </Box>
  );
};

export default GestionFichas;
