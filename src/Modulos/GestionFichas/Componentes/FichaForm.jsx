import React, { useState } from "react";
import { crearFichaTecnica } from "../../services/fichaService";

const FichaForm = () => {
  const [formData, setFormData] = useState({
    idCita: "",
    kilometrajeIngreso: "",
    kilometrajeProximo: "",
    detallesServicio: "",
    mecanicoResponsable: "",
  });

  const [fichaCreada, setFichaCreada] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const ficha = await crearFichaTecnica(formData);
      setFichaCreada(ficha); // Guarda la ficha creada para mostrarla
    } catch (err) {
      setError("Error al crear la ficha técnica. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h2>Crear Ficha Técnica</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID Cita:
          <input
            type="text"
            name="idCita"
            value={formData.idCita}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Kilometraje de Ingreso:
          <input
            type="number"
            name="kilometrajeIngreso"
            value={formData.kilometrajeIngreso}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Kilometraje Próximo:
          <input
            type="number"
            name="kilometrajeProximo"
            value={formData.kilometrajeProximo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Detalles del Servicio:
          <textarea
            name="detallesServicio"
            value={formData.detallesServicio}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mecánico Responsable:
          <input
            type="text"
            name="mecanicoResponsable"
            value={formData.mecanicoResponsable}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Crear Ficha Técnica</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {fichaCreada && (
        <div>
          <h3>Ficha Técnica Creada</h3>
          <p>
            <strong>ID Ficha:</strong> {fichaCreada.idFicha}
          </p>
          <p>
            <strong>ID Cita:</strong> {fichaCreada.idCita}
          </p>
          <p>
            <strong>Kilometraje Ingreso:</strong>{" "}
            {fichaCreada.kilometrajeIngreso}
          </p>
          <p>
            <strong>Kilometraje Próximo:</strong>{" "}
            {fichaCreada.kilometrajeProximo}
          </p>
          <p>
            <strong>Detalles Servicio:</strong> {fichaCreada.detallesServicio}
          </p>
          <p>
            <strong>Mecánico Responsable:</strong>{" "}
            {fichaCreada.mecanicoResponsable}
          </p>
        </div>
      )}
    </div>
  );
};

export default FichaForm;
