import { API_URL, BASE_PATH } from "../../../config";

export const obtenerMecanicos = async () => {
  try {
    const response = await fetch(
      `${API_URL}${BASE_PATH}FichaTecnica/mecanicos`
    );

    if (!response.ok) {
      throw new Error(`Error al obtener los mecánicos: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los mecánicos:", error);
    throw error;
  }
};
