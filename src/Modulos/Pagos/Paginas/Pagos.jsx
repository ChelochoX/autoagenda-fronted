import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Pagos = () => {
  const pagosPendientes = [
    {
      cliente: "Juan Pérez",
      servicio: "Cambio de aceite",
      total: "150.000 Gs.",
    },
    {
      cliente: "Ana Gómez",
      servicio: "Revisión completa",
      total: "250.000 Gs.",
    },
  ];

  const pagosCompletados = [
    {
      cliente: "Carlos López",
      servicio: "Alineación",
      total: "200.000 Gs.",
      fechaPago: "08/01/2025",
    },
  ];

  // Función para generar el comprobante en PDF
  const handleGeneratePDF = (pago) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Comprobante de Pago", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Cliente: ${pago.cliente}`, 20, 40);
    doc.text(`Servicio: ${pago.servicio}`, 20, 50);
    doc.text(`Total Pagado: ${pago.total}`, 20, 60);
    doc.text(`Fecha de Pago: ${pago.fechaPago}`, 20, 70);

    doc.autoTable({
      startY: 90,
      head: [["Detalle", "Valor"]],
      body: [
        ["Cliente", pago.cliente],
        ["Servicio", pago.servicio],
        ["Total Pagado", pago.total],
        ["Fecha de Pago", pago.fechaPago],
      ],
    });

    doc.save(`Comprobante_${pago.cliente}.pdf`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        p: 3,
      }}
    >
      {/* Título */}
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          color: "#1976d2",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Gestión de Pagos
      </Typography>

      {/* Selector de Fecha */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container justifyContent="center" sx={{ mb: 3 }}>
          <DatePicker
            label="Seleccionar Fecha"
            sx={{ width: "100%", maxWidth: 300 }}
          />
        </Grid>
      </LocalizationProvider>

      {/* Lista de Pagos Pendientes */}
      <Box
        sx={{
          mb: 3,
          backgroundColor: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#ff9800",
            fontWeight: "bold",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          Pagos Pendientes
        </Typography>
        {pagosPendientes.map((pago, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    <strong>Cliente:</strong> {pago.cliente}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Servicio:</strong> {pago.servicio}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Total:</strong> {pago.total}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    textAlign: { xs: "center", sm: "right" },
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth={false}
                    sx={{ fontSize: "14px", minWidth: "140px" }}
                  >
                    MARCAR COMO PAGADO
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Lista de Pagos Completados */}
      <Box
        sx={{
          mb: 3,
          backgroundColor: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#4caf50",
            fontWeight: "bold",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          Pagos Completados
        </Typography>
        {pagosCompletados.map((pago, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1">
                    <strong>Cliente:</strong> {pago.cliente}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Servicio:</strong> {pago.servicio}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Total:</strong> {pago.total}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Fecha de Pago:</strong> {pago.fechaPago}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    mt: { xs: 2, sm: 0 },
                    textAlign: { xs: "center", sm: "right" },
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleGeneratePDF(pago)}
                    fullWidth={false}
                    sx={{ fontSize: "14px", minWidth: "140px" }}
                  >
                    VER COMPROBANTE
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Pagos;
