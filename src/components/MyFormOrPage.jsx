import { useState } from 'react';
import ErrorMessage from './ErrorMessage'; // Componente para mostrar errores
import { fetchData } from '../services/apiService'; // Servicio para interactuar con la API

export const MyFormOrPage = () => {
  const [inputData, setInputData] = useState(''); // Estado para almacenar los datos
  const [error, setError] = useState(''); // Estado para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones locales
    if (!inputData) {
      setError('El campo no puede estar vacío');
      return;
    }

    try {
      // Envía los datos al backend
      const result = await fetchData('/api/some-endpoint', {
        method: 'POST',
        body: { inputData },
      });

      console.log('Operación exitosa', result);
      setError(''); // Limpiar error si todo salió bien
      setInputData(''); // Limpiar el campo después del envío exitoso
    } catch (err) {
      setError(err.message); // Muestra el error devuelto por el backend
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {error && <ErrorMessage message={error} />} {/* Mostrar errores si existen */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Datos:</label>
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default MyFormOrPage;
