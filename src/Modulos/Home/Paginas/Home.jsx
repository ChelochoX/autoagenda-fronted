import React from "react";
import { Box, Card, CardMedia } from "@mui/material";

const flyers = [
  {
    id: 1,
    title: "Promoción 1",
    description: "¡Descubre nuestras increíbles promociones para tu vehículo!",
    image: "/imagenes/mecanico.png", // Ruta al flyer 1
  },
  {
    id: 2,
    title: "Servicio Premium",
    description: "El mejor cuidado y mantenimiento para tu vehículo.",
    image: "/imagenes/mecanico1.png", // Ruta al flyer 2
  },
];

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      {flyers.map((flyer) => (
        <Card
          key={flyer.id}
          sx={{
            width: "100%",
            margin: "20px 0",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={flyer.image}
            alt={flyer.title}
            sx={{
              width: "100%",
              height: { xs: "250px", sm: "400px", md: "600px" }, // Ajuste dinámico del tamaño
              objectFit: "cover",
            }}
          />
        </Card>
      ))}
    </Box>
  );
};

export default Home;
