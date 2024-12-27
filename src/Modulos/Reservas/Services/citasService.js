// citasService.js

const API_URL = "https://localhost:7050/api";

// Obtener tipos de servicios
export const obtenerTiposServicios = async () => {
  try {
    const response = await fetch(`${API_URL}/TipoServicios/tiposservicios`);
    if (!response.ok) {
      throw new Error(
        `Error al obtener tipos de servicios: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerTiposServicios:", error);
    throw error;
  }
};

// Crear una nueva cita con detalles
export const crearCitaConDetalles = async (citaConDetalles) => {
  try {
    const response = await fetch(`${API_URL}/Citas/crear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(citaConDetalles),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || "Error al crear la cita");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en crearCitaConDetalles:", error);
    throw error;
  }
};

// Obtener marcas de vehículos
export const obtenerMarcas = async () => {
  try {
    const response = await fetch(`${API_URL}/Vehiculos/marcas`);
    if (!response.ok) {
      throw new Error(`Error al obtener marcas: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerMarcas:", error);
    throw error;
  }
};

// Obtener modelos de vehículos por marca
export const obtenerModelosPorMarca = async (idMarca) => {
  try {
    const response = await fetch(`${API_URL}/Vehiculos/modelos/${idMarca}`);
    if (!response.ok) {
      throw new Error(`Error al obtener modelos: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerModelosPorMarca:", error);
    throw error;
  }
};

// Obtener años de vehículos
export const obtenerAnhos = async () => {
  try {
    const response = await fetch(`${API_URL}/Vehiculos/anhos`);
    if (!response.ok) {
      throw new Error(`Error al obtener años: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerAnhos:", error);
    throw error;
  }
};

// Crear un nuevo vehículo
export const crearVehiculo = async (vehiculo) => {
  try {
    const response = await fetch(`${API_URL}/Vehiculos/crear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehiculo),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || "Error al crear vehículo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en crearVehiculo:", error);
    throw error;
  }
};

// Obtener citas por fecha e ID de usuario
export const obtenerCitasPorFechaYUsuario = async (fecha, idUsuario) => {
  try {
    const response = await fetch(
      `${API_URL}/Citas/buscarcita?fecha=${fecha}&idUsuario=${idUsuario}`
    );

    if (response.status === 204) {
      // Si el backend devuelve 204, significa que no hay citas
      return []; // Devuelve un array vacío al frontend
    }

    if (!response.ok) {
      throw new Error(
        `Error al obtener citas: ${response.status} ${response.statusText}`
      );
    }

    return await response.json(); // Analiza la respuesta si es válida
  } catch (error) {
    console.error("Error en obtenerCitasPorFechaYUsuario:", error);
    throw error; // Vuelve a lanzar el error para manejarlo en el componente
  }
};

// Eliminar una cita
export const eliminarCita = async (idCita) => {
  try {
    const response = await fetch(`${API_URL}/Citas/${idCita}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la cita");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en eliminarCita:", error);
    throw error;
  }
};
