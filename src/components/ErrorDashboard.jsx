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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Errores en Tiempo Real</h1>

      {/* Tabla de Errores */}
      <div className="bg-white rounded-lg shadow p-4 overflow-auto">
        {errors.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Tipo de Error</th>
                <th className="px-4 py-2 border">Mensaje</th>
                <th className="px-4 py-2 border">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((error, index) => (
                <tr key={index} className="border-b">
                  <td className={`px-4 py-2 ${error.type === 'exception' ? 'text-red-500' : 'text-blue-500'}`}>
                    {error.type}
                  </td>
                  <td className="px-4 py-2">{error.message}</td>
                  <td className="px-4 py-2">{new Date(error.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay errores para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorDashboard;
