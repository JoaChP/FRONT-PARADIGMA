import { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

export const ErrorLog = () => {
  const [errors, setErrors] = useState([]); // Estado para almacenar los errores
  const [filter, setFilter] = useState(''); // Estado para el filtro de errores

  // Obtener todos los errores al cargar la página
  useEffect(() => {
    const fetchAllErrors = async () => {
      try {
        const response = await fetch('https://localhost:7209/api/ErrorLog');
        const allErrors = await response.json();
        setErrors((prevErrors) => [...allErrors, ...prevErrors]);
      } catch (error) {
        console.error('Error cargando los errores iniciales:', error);
      }
    };

    fetchAllErrors();
  }, []);

  // Conectar con EventSource al montar el componente
  useEffect(() => {
    const eventSource = new EventSource('https://localhost:7209/api/ErrorLog/stream');

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
  const filteredErrors = errors.filter((error) => {
    if (filter === 'controlled') {
      return error.isControlled === true;
    } else if (filter === 'exception') {
      return error.isControlled === false;
    }
    return true; // Mostrar todos si no hay filtro
  });

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
                key={error._id}
                className={`p-4 rounded-lg shadow flex items-start space-x-4 ${
                  error.isControlled === false
                    ? 'bg-red-700 text-red-100'
                    : 'bg-green-700 text-green-100'
                }`}
              >
                <div className="mt-1">
                  {error.isControlled === false ? (
                    <FaExclamationTriangle className="text-2xl" />
                  ) : (
                    <FaInfoCircle className="text-2xl" />
                  )}
                </div>
                <div>
                  <p className="mb-2">
                    <strong>ID:</strong> {error._id}
                  </p>
                  <p className="mb-2">
                    <strong>Número de Tarjeta:</strong> {error.CardNumber}
                  </p>
                  <p className="mb-2">
                    <strong>Fecha de Compra:</strong>{' '}
                    {new Date(error.PurchaseDate).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Monto:</strong> ${error.Amount.toFixed(2)}
                  </p>
                  <p className="mb-2">
                    <strong>Estado:</strong> {error.Status}
                  </p>
                  <p className="mb-2">
                    <strong>Mensaje de Error:</strong> {error.ErrorMessage}
                  </p>
                  <p className="mb-2">
                    <strong>Es Reintentable:</strong>{' '}
                    {error.IsRetryable ? 'Sí' : 'No'}
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
