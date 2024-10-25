export const fetchData = async (endpoint, options = {}) => {
    try {
      const response = await fetch(endpoint, {
        method: options.method || 'GET',   // Puedes ajustar el método aquí
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,  // Permite personalizar headers adicionales si es necesario
        },
        body: options.body ? JSON.stringify(options.body) : null,  // Convertir el body en JSON
      });
  
      // Verifica si el código de respuesta no es exitoso
      if (!response.ok) {
        const errorData = await response.json(); // Intentar obtener el error del cuerpo
        throw new Error(errorData.message || 'Error al obtener los datos de la API');
      }
  
      // Si la respuesta es correcta, devuelve el cuerpo en formato JSON
      return await response.json();
    } catch (error) {
      // Manejar cualquier error durante la llamada o el procesamiento
      console.error('API Error:', error.message);
      throw error;
    }
  };
  