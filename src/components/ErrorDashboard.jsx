import { useEffect, useState } from 'react';

export const ErrorDashboard = () => {
  const [errors, setErrors] = useState([]); // Estado para almacenar los errores en tiempo real

  // Conectar con EventSource al montar el componente
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/api/errorlogs/stream');

    // Al recibir un mensaje, actualizar el estado con solo el nuevo error
    eventSource.onmessage = (event) => {
      const newError = JSON.parse(event.data);
      setErrors([newError]); // Actualizar el estado con solo el nuevo error
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Dashboard de Errores en Tiempo Real</h1>

      {/* Tabla de Errores */}
      <div className="bg-gray-800 rounded-lg shadow p-6 overflow-auto">
        {errors.length > 0 ? (
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-700 text-left text-gray-300">Tipo de Error</th>
                <th className="px-4 py-2 border-b border-gray-700 text-left text-gray-300">Mensaje</th>
                <th className="px-4 py-2 border-b border-gray-700 text-left text-gray-300">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((error, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td
                    className={`px-4 py-2 ${
                      error.type === 'exception' ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {error.type === 'exception' ? 'Excepción' : 'Error Controlado'}
                  </td>
                  <td className="px-4 py-2 text-gray-100">{error.message}</td>
                  <td className="px-4 py-2 text-gray-100">{new Date(error.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No hay errores para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorDashboard;
