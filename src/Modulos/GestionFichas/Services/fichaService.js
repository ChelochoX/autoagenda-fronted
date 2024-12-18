import axios from "axios";

const API_URL = "https://localhost:5001/api/FichaTecnica";

export const crearFichaTecnica = async (request) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, request);
    return response.data; // Retorna los datos completos de la ficha técnica
  } catch (error) {
    console.error("Error al crear la ficha técnica:", error);
    throw error;
  }
};
