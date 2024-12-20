const API_URL = "https://localhost:7050/api/FichaTecnica";

// Crear ficha técnica
export const crearFichaTecnica = async (request) => {
  try {
    const response = await fetch(`${API_URL}/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Error al crear la ficha técnica: ${response.status}`);
    }

    // Retornar el DTO completo del backend
    return await response.json();
  } catch (error) {
    console.error("Error al crear la ficha técnica:", error);
    throw error;
  }
};
