import { API_URL, BASE_PATH } from "../../../config";

// Verifica si la respuesta es JSON
const isJSONResponse = (response) => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.includes("application/json");
};

// Manejo genérico de respuestas
const handleResponse = async (response) => {
  try {
    if (response.status === 204) {
      // Sin contenido: devuelve un valor predeterminado
      return null;
    }

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      if (isJSONResponse(response)) {
        const errorData = await response.json();
        errorMessage = errorData.mensaje || errorMessage;
      }
      console.warn("Advertencia:", errorMessage);
      return null; // Devuelve un valor predeterminado para errores
    }

    // Intentar parsear como JSON solo si el contenido es JSON
    if (isJSONResponse(response)) {
      return await response.json();
    } else {
      console.warn("Advertencia: La respuesta no es un JSON válido");
      return null; // Devuelve un valor predeterminado
    }
  } catch (error) {
    console.error("Error en handleResponse:", error);
    return null; // Devuelve un valor predeterminado en caso de error
  }
};

// Obtener ficha técnica por cita
export const obtenerFichaPorCita = async (idCita) => {
  try {
    const response = await fetch(
      `${API_URL}${BASE_PATH}FichaTecnica/porcita/${idCita}`
    );
    return await handleResponse(response);
  } catch (error) {
    console.error("Error crítico en obtenerFichaPorCita:", error);
    return null; // Devuelve un valor predeterminado
  }
};

// Actualizar ficha técnica
export const actualizarFichaTecnica = async (id, ficha) => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}FichaTecnica/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ficha),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error crítico en actualizarFichaTecnica:", error);
    return null; // Devuelve un valor predeterminado
  }
};
