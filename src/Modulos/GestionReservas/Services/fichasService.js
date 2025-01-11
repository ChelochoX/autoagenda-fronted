import { API_URL, BASE_PATH } from "../../../config";
import { format } from "date-fns";

export const obtenerUsuarioPorId = async (idUsuario) => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}Usuarios/${idUsuario}`);
    if (!response.ok) {
      throw new Error(
        `Error al obtener el usuario: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerUsuarioPorId:", error);
    throw error;
  }
};

export const actualizarEstadoCita = async (idCita, nuevoEstado) => {
  try {
    const response = await fetch(
      `${API_URL}${BASE_PATH}Citas/${idCita}/estado`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEstado), // Asegúrate de incluir estadoDTO
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error al actualizar el estado de la cita: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error en actualizarEstadoCita:", error);
    throw error;
  }
};

export const actualizarCita = async (idCita, body) => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}Citas/${idCita}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(
        `Error al actualizar la cita: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error en actualizarCita:", error);
    throw error;
  }
};

export const cargarCitas = async (fecha, idUsuario) => {
  const fechaFormateada = format(fecha, "yyyy-MM-dd");
  try {
    const response = await fetch(
      `${API_URL}${BASE_PATH}Citas/buscarcita?fecha=${fechaFormateada}&idUsuario=${idUsuario}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error en cargarCitas:", error);
    return [];
  }
};

export const crearFichaTecnica = async (request) => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}FichaTecnica/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Error al crear la ficha técnica: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear la ficha técnica:", error);
    throw error;
  }
};
