import { API_URL, BASE_PATH } from "../../../config";

export const obtenerFichaPorCita = async (idCita) => {
  try {
    const response = await fetch(
      `${API_URL}${BASE_PATH}FichaTecnica/porcita/${idCita}`
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener la ficha técnica: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerFichaPorCita:", error);
    throw error;
  }
};

export const actualizarFichaTecnica = async (id, ficha) => {
  try {
    const response = await fetch(`${API_URL}${BASE_PATH}FichaTecnica/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ficha),
    });

    if (!response.ok) {
      throw new Error(
        `Error al actualizar la ficha técnica: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en actualizarFichaTecnica:", error);
    throw error;
  }
};
