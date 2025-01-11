import { API_URL, BASE_PATH } from "../../../config";

export const obtenerTiposServicios = async () => {
  try {
    const response = await fetch(
      `${API_URL}${BASE_PATH}TipoServicios/tiposservicios`
    );
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

export const crearCitaConDetalles = async (citaConDetalles) => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}Citas/crear`, {
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

export const obtenerMarcas = async () => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}Vehiculos/marcas`);
    if (!response.ok) {
      throw new Error(`Error al obtener marcas: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerMarcas:", error);
    throw error;
  }
};

export const obtenerModelosPorMarca = async (idMarca) => {
  try {
    const response = await fetch(
      `${API_URL}${BASE_PATH}Vehiculos/modelos/${idMarca}`
    );
    if (!response.ok) {
      throw new Error(`Error al obtener modelos: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerModelosPorMarca:", error);
    throw error;
  }
};

export const obtenerAnhos = async () => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}Vehiculos/anhos`);
    if (!response.ok) {
      throw new Error(`Error al obtener años: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerAnhos:", error);
    throw error;
  }
};

export const crearVehiculo = async (vehiculo) => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}Vehiculos/crear`, {
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

export const obtenerCitasPorFechaYUsuario = async (fecha, idUsuario) => {
  try {
    const response = await fetch(
      `${API_URL}${BASE_PATH}Citas/buscarcita?fecha=${fecha}&idUsuario=${idUsuario}`
    );

    if (response.status === 204) {
      return []; // Devuelve un array vacío si no hay citas
    }

    if (!response.ok) {
      throw new Error(
        `Error al obtener citas: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error en obtenerCitasPorFechaYUsuario:", error);
    throw error;
  }
};

export const eliminarCita = async (idCita) => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}Citas/${idCita}`, {
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
