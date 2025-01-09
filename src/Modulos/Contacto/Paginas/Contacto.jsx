import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const Contacto = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5", // Blanco perlado
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: "900px",
          justifyContent: "center",
        }}
      >
        {/* Card de Vehículo Central */}
        <Grid item xs={12}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              borderRadius: "15px",
              padding: "20px",
            }}
          >
            <CardMedia>
              <DirectionsCarIcon
                sx={{
                  fontSize: "100px",
                  color: "#1976d2",
                  marginBottom: "15px",
                }}
              />
            </CardMedia>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                textAlign: "center",
              }}
            >
              Tu vehículo es nuestra prioridad
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", textAlign: "center", marginTop: "10px" }}
            >
              Ofrecemos los mejores servicios de mantenimiento y cuidado para tu
              automóvil.
            </Typography>
          </Card>
        </Grid>

        {/* Card de Información de Contacto */}
        <Grid item xs={12}>
          <Card
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              borderRadius: "15px",
              padding: "20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  color: "#1976d2",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Información de Contacto
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Teléfono:</strong> +595 123 456 789
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> contacto@mantenimientos.com
              </Typography>
              <Typography variant="body1">
                <strong>Dirección:</strong> Calle Principal #123, Ciudad Central
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Servicios Ofrecidos */}
        <Grid item xs={12}>
          <Card
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              borderRadius: "15px",
              padding: "20px",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  color: "#4caf50",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Servicios Ofrecidos
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Revisión completa del vehículo" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Cambio de aceite y filtros" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Inspección de frenos y suspensión" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Diagnóstico computarizado" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Servicio de alineación y balanceo" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contacto;
