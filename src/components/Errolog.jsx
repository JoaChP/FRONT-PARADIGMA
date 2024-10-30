import { useEffect, useState } from 'react';

export const ErrorLog = () => {
  const [errors, setErrors] = useState([]); // Estado para almacenar los errores
  const [filter, setFilter] = useState(''); // Estado para el filtro de errores

  // Conectar con EventSource al montar el componente
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/api/errors/stream');

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Log de Errores</h1>

      {/* Filtro de errores */}
      <div className="mb-4">
        <label className="text-lg">Filtrar por tipo:</label>
        <select
          className="ml-2 p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="controlled">Errores Controlados</option>
          <option value="exception">Excepciones</option>
        </select>
      </div>

      {/* Lista de Errores */}
      <div className="bg-white rounded-lg shadow p-4">
        {filteredErrors.length > 0 ? (
          <ul>
            {filteredErrors.map((error) => (
              <li
                key={error.id}
                className={`p-4 border-b ${
                  error.type === 'exception' ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                <p><strong>Tipo:</strong> {error.type}</p>
                <p><strong>Mensaje:</strong> {error.message}</p>
                <p><strong>Fecha:</strong> {new Date(error.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay errores para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorLog;
