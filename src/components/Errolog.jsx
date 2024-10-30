import { useState } from 'react';

export const ErrorLog = () => {
  // Datos quemados de errores
  const initialErrors = [
    {
      id: 1,
      type: 'controlled',
      message: 'Error de validación en el formulario',
      timestamp: '2024-10-29T10:30:00Z',
    },
    {
      id: 2,
      type: 'exception',
      message: 'Excepción en la conexión con la base de datos',
      timestamp: '2024-10-29T11:00:00Z',
    },
    {
      id: 3,
      type: 'controlled',
      message: 'Error al cargar los datos del usuario',
      timestamp: '2024-10-29T12:15:00Z',
    },
    {
      id: 4,
      type: 'exception',
      message: 'Error inesperado en el servidor',
      timestamp: '2024-10-29T13:00:00Z',
    },
  ];

  const [errors, setErrors] = useState(initialErrors); // Estado para almacenar los errores
  const [filter, setFilter] = useState(''); // Estado para el filtro de errores

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
