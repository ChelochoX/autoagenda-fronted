import { BASE_URL } from "../../../config";

export const obtenerMecanicos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/FichaTecnica/mecanicos`); // Aquí ya no debería incluir `undefined`

    console.log("Raw response:", response);

    if (!response.ok) {
      throw new Error(`Error al obtener los mecánicos: ${response.status}`);
    }

    const data = await response.json();
    console.log("Parsed JSON:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener los mecánicos:", error);
    throw error;
  }
};
