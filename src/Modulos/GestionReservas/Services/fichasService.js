export const obtenerFichaPorCita = async (idCita) => {
  try {
    const response = await fetch(
      `https://localhost:7050/api/FichaTecnica/porcita/${idCita}`
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener la ficha técnica: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerFichaPorCita:", error);
    throw error;
  }
};
