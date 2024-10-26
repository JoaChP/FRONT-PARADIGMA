import axios from 'axios';

const API_URL = 'https://tu-api-url.com'; // Cambia esto por la URL de tu API

// Función para obtener la lista de errores
export const getErrors = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/errors`);
    return response.data; // Supone que `data` es la lista de errores
  } catch (error) {
    console.error("Error al obtener los errores:", error);
    throw error;
  }
};
