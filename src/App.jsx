import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Componentes/Header"; // Encabezado global
// import Home from "./Modulos/Home/Home";
import Agendamiento from "./Modulos/Reservas/Paginas/Agendamiento";
import Contacto from "./Modulos/Contacto/Paginas/Contacto";
import GestionReservas from "./Modulos/GestionReservas/Pagina/GestionReservas";
import GestionFichas from "./Modulos/GestionFichas/Pagina/GestionFichas";
import Pagos from "./Modulos/Pagos/Paginas/Pagos";

const App = () => {
  return (
    <Router>
      {/* Componente global Header */}
      <Header />
      {/* Rutas para el contenido dinámico */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/reserva" element={<Agendamiento />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/gestionreservas" element={<GestionReservas />} />
        <Route path="/gestionfichas" element={<GestionFichas />} />
        <Route path="/pagos" element={<Pagos />} />
      </Routes>
    </Router>
  );
};

export default App;
