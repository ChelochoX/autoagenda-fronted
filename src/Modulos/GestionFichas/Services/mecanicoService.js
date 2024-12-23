import { BASE_URL } from "../../../config";

export const obtenerMecanicos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/FichaTecnica/mecanicos`); // Aquí ya no debería incluir `undefined`

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
