import { BASE_URL } from "../../../config";

export const crearFichaTecnica = async (request) => {
  try {
    const response = await fetch(`${BASE_URL}/api/FichaTecnica/crear`, {
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
