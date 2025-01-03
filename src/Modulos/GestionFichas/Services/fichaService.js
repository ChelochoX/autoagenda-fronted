import { BASE_URL } from "../../../config";

export const obtenerFichaPorCita = async (idCita) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/FichaTecnica/porcita/${idCita}`
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
