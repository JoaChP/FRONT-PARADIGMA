import { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

export const ErrorLog = () => {
  const [errors, setErrors] = useState([]); // Estado para almacenar los errores
  const [filter, setFilter] = useState(''); // Estado para el filtro de errores

  // Conectar con EventSource al montar el componente
  useEffect(() => {
    // Cambiar la ruta del EventSource al nuevo endpoint en el backend
    const eventSource = new EventSource('http://localhost:5000/api/errorlogs/stream');

    // Al recibir un mensaje, agregar el error al estado
    eventSource.onmessage = (event) => {
      const newError = JSON.parse(event.data);
      setErrors((prevErrors) => [newError, ...prevErrors]);
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
      eventSource.close();
    };
  }, []);

  // Filtrar errores según el estado del filtro
  const filteredErrors = errors.filter((error) =>
    filter ? error.type.includes(filter) : true
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-100">Log de Errores</h1>

      {/* Filtro de errores */}
      <div className="mb-6">
        <label className="text-lg text-gray-200 mr-2">Filtrar por tipo:</label>
        <select
          className="p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="controlled">Errores Controlados</option>
          <option value="exception">Excepciones</option>
        </select>
      </div>

      {/* Lista de Errores */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        {filteredErrors.length > 0 ? (
          <ul className="space-y-4">
            {filteredErrors.map((error) => (
              <li
                key={error.id}
                className={`p-4 rounded-lg shadow flex items-start space-x-4 ${
                  error.type === 'exception'
                    ? 'bg-red-700 text-red-100'
                    : 'bg-green-700 text-green-100'
                }`}
              >
                <div className="mt-1">
                  {error.type === 'exception' ? (
                    <FaExclamationTriangle className="text-2xl" />
                  ) : (
                    <FaInfoCircle className="text-2xl" />
                  )}
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Tipo:</strong> {error.type === 'exception' ? 'Excepción' : 'Error Controlado'}
                  </p>
                  <p className="mb-2">
                    <strong>Mensaje:</strong> {error.message}
                  </p>
                  <p className="text-sm">
                    <strong>Fecha:</strong> {new Date(error.timestamp).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No hay errores para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorLog;
