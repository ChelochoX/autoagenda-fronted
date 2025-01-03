import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventIcon from "@mui/icons-material/Event";
import BuildIcon from "@mui/icons-material/Build";
import { obtenerMecanicos } from "../Services/mecanicoService";

const FichaForm = ({ ficha, onFichaActualizada }) => {
  // Funciones auxiliares para formateo
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatGuarani = (value) => {
    if (!value) return "N/A";
    return new Intl.NumberFormat("es-PY").format(value) + " Gs.";
  };

  // Estados del formulario
  const [kilometrajeIngreso, setKilometrajeIngreso] = useState(
    ficha.kilometrajeIngreso || ""
  );
  const [kilometrajeProximo, setKilometrajeProximo] = useState(
    ficha.kilometrajeProximo || ""
  );
  const [detallesServicio, setDetallesServicio] = useState(
    ficha.detallesServicio || ""
  );
  const [mecanicos, setMecanicos] = useState([]);
  const [mecanicoSeleccionado, setMecanicoSeleccionado] = useState(
    ficha.mecanicoResponsable || ""
  );

  // Obtener mecánicos desde el backend
  useEffect(() => {
    const fetchMecanicos = async () => {
      try {
        const data = await obtenerMecanicos();
        setMecanicos(data);
      } catch (error) {
        console.error("Error al obtener los mecánicos:", error);
      }
    };

    fetchMecanicos();
  }, []);

  // Handlers
  const handleGuardar = () => {
    const fichaActualizada = {
      ...ficha,
      kilometrajeIngreso: parseInt(kilometrajeIngreso.replace(/\./g, ""), 10),
      kilometrajeProximo: parseInt(kilometrajeProximo.replace(/\./g, ""), 10),
      detallesServicio,
      mecanicoResponsable: mecanicoSeleccionado,
    };
    onFichaActualizada(fichaActualizada);
  };

  const handleCancelar = () => {
    setKilometrajeIngreso(ficha.kilometrajeIngreso || "");
    setKilometrajeProximo(ficha.kilometrajeProximo || "");
    setDetallesServicio(ficha.detallesServicio || "");
    setMecanicoSeleccionado(ficha.mecanicoResponsable || "");
  };

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        mx: "auto",
        p: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "#1976d2",
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Gestión de Ficha Técnica
      </Typography>

      <Grid container spacing={2}>
        {/* Información del Cliente */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", boxShadow: 2 }}>
            <CardHeader
              avatar={
                <PersonIcon sx={{ color: "#ff9800", fontSize: "36px" }} />
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ color: "#ff9800", fontWeight: "bold" }}
                >
                  Información del Cliente
                </Typography>
              }
            />
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Nombre:</strong> {ficha.nombreCliente || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Correo:</strong> {ficha.correoCliente || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Teléfono:</strong> {ficha.telefonoCliente || "N/A"}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Información del Vehículo */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", boxShadow: 2 }}>
            <CardHeader
              avatar={
                <DirectionsCarIcon
                  sx={{ color: "#4caf50", fontSize: "36px" }}
                />
              }
              title={
                <Typography
                  variant="h6"
                  sx={{ color: "#4caf50", fontWeight: "bold" }}
                >
                  Información del Vehículo
                </Typography>
              }
            />
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Placa:</strong> {ficha.placaVehiculo || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Marca:</strong> {ficha.nombreMarca || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Modelo:</strong> {ficha.nombreModelo || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Año:</strong> {ficha.anhoVehiculo || "N/A"}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Datos de la Cita */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 2 }}>
            <CardHeader
              avatar={<EventIcon sx={{ color: "#fbc02d", fontSize: "36px" }} />}
              title={
                <Typography
                  variant="h6"
                  sx={{ color: "#fbc02d", fontWeight: "bold" }}
                >
                  Datos de la Cita
                </Typography>
              }
            />
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Fecha:</strong> {formatDate(ficha.fechaCita)}
                </Typography>
                <Typography variant="body2">
                  <strong>Hora:</strong> {ficha.horaCita || "N/A"}
                </Typography>
                <Typography variant="body2">
                  <strong>Estado:</strong> {ficha.estado || "N/A"}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="h6">Servicios Solicitados:</Typography>
                {ficha.detallesServicios &&
                ficha.detallesServicios.length > 0 ? (
                  ficha.detallesServicios.map((servicio, index) => (
                    <Box key={index} sx={{ pl: 2 }}>
                      <Typography variant="body2">
                        <strong>Tipo:</strong> {servicio.tipoServicio}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Descripción:</strong>{" "}
                        {servicio.descripcion || "N/A"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Costo:</strong>{" "}
                        {formatGuarani(servicio.precioServicio)}
                      </Typography>
                      {index !== ficha.detallesServicios.length - 1 && (
                        <Divider sx={{ my: 1 }} />
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">
                    No hay servicios asociados.
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Detalles de la Ficha Técnica */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 2 }}>
            <CardHeader
              avatar={<BuildIcon sx={{ color: "#2196f3", fontSize: "36px" }} />}
              title={
                <Typography
                  variant="h6"
                  sx={{ color: "#2196f3", fontWeight: "bold" }}
                >
                  Detalles de la Ficha Técnica
                </Typography>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Mecánico Responsable"
                    value={mecanicoSeleccionado}
                    onChange={(e) => setMecanicoSeleccionado(e.target.value)}
                    fullWidth
                  >
                    {mecanicos.map((mecanico) => (
                      <MenuItem
                        key={mecanico.idMecanico}
                        value={`${mecanico.nombre} ${mecanico.apellido}`}
                      >
                        {`${mecanico.nombre} ${mecanico.apellido}`}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Kilometraje de Ingreso"
                    value={kilometrajeIngreso}
                    onChange={(e) =>
                      setKilometrajeIngreso(e.target.value.replace(/\D/g, ""))
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Kilometraje Próximo"
                    value={kilometrajeProximo}
                    onChange={(e) =>
                      setKilometrajeProximo(e.target.value.replace(/\D/g, ""))
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
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <Button variant="contained" color="primary" onClick={handleGuardar}>
          Guardar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancelar}>
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};

export default FichaForm;
