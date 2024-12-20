import React, { useState } from "react";

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

  const handleGuardar = () => {
    const fichaActualizada = {
      ...ficha,
      detallesServicio,
      kilometrajeIngreso,
      kilometrajeProximo,
    };
    onFichaActualizada(fichaActualizada); // Actualizamos en `GestionFichas`
  };

  return (
    <form>
      <div>
        <label>Detalles del Servicio:</label>
        <input
          type="text"
          value={detallesServicio}
          onChange={(e) => setDetallesServicio(e.target.value)}
        />
      </div>
      <div>
        <label>Kilometraje de Ingreso:</label>
        <input
          type="number"
          value={kilometrajeIngreso}
          onChange={(e) => setKilometrajeIngreso(e.target.value)}
        />
      </div>
      <div>
        <label>Kilometraje Próximo:</label>
        <input
          type="number"
          value={kilometrajeProximo}
          onChange={(e) => setKilometrajeProximo(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleGuardar}>
        Guardar
      </button>
    </form>
  );
};

export default FichaForm;
