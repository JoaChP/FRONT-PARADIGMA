import axios from 'axios';

const API_URL = 'https://tu-api-url.com'; // Reemplaza con la URL correcta de tu backend

export const fetchData = async (endpoint, options) => {
  try {
    const response = await axios({
      url: `${API_URL}${endpoint}`,
      method: options.method || 'GET',
      data: options.body || {},
    });
    return response.data;
  } catch (error) {
    // Lanza el mensaje de error del backend o un mensaje general
    throw new Error(error.response?.data?.message || 'Error en la solicitud');
  }
};
