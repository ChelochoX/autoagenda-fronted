import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  Stack,
} from "@mui/material";

const FichaForm = ({ ficha, onFichaActualizada }) => {
  const [detallesServicio, setDetallesServicio] = useState(
    ficha.detallesServicio || ""
  );
  const [kilometrajeIngreso, setKilometrajeIngreso] = useState(
    ficha.kilometrajeIngreso || 0
  );
  const [kilometrajeProximo, setKilometrajeProximo] = useState(
    ficha.kilometrajeProximo || 0
  );
  const [mecanicoResponsable, setMecanicoResponsable] = useState(
    ficha.mecanicoResponsable || ""
  );

  const handleGuardar = () => {
    const fichaActualizada = {
      ...ficha,
      detallesServicio,
      kilometrajeIngreso,
      kilometrajeProximo,
      mecanicoResponsable,
    };
    onFichaActualizada(fichaActualizada);
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f9f9f9", // Fondo blanco perlado
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", // Sombra sutil
      }}
    >
      {/* Título principal */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#1976d2",
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Gestión de Ficha Técnica
      </Typography>

      {/* Información del Cliente */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#ff5722",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Información del Cliente
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nombre del Cliente"
            value={ficha.nombreCliente || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Correo Electrónico"
            value={ficha.correoCliente || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Teléfono"
            value={ficha.telefonoCliente || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Información del Vehículo */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#4caf50",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Información del Vehículo
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Placa del Vehículo"
            value={ficha.placaVehiculo || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Marca"
            value={ficha.nombreMarca || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Modelo"
            value={ficha.nombreModelo || ""}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Detalles de la Ficha Técnica */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#3f51b5",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Detalles de la Ficha Técnica
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Kilometraje de Ingreso"
            type="number"
            value={kilometrajeIngreso}
            onChange={(e) =>
              setKilometrajeIngreso(
                e.target.value === "" ? "" : parseInt(e.target.value, 10)
              )
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Kilometraje Próximo"
            type="number"
            value={kilometrajeProximo}
            onChange={(e) =>
              setKilometrajeProximo(
                e.target.value === "" ? "" : parseInt(e.target.value, 10)
              )
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Detalles del Servicio"
            value={detallesServicio}
            onChange={(e) => setDetallesServicio(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mecánico Responsable"
            value={mecanicoResponsable}
            onChange={(e) => setMecanicoResponsable(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Botones */}
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGuardar}
          sx={{ px: 4, fontSize: "16px", fontWeight: "bold" }}
        >
          Guardar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ px: 4, fontSize: "16px", fontWeight: "bold" }}
        >
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};

export default FichaForm;
