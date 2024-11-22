// src/components/ErrorDashboard.jsx
import { useEffect, useState, useMemo } from 'react';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

export const ErrorDashboard = () => {
  const [errors, setErrors] = useState([]); // Estado para almacenar los errores en tiempo real

  // Función para verificar si un error ya existe en el estado
  const isErrorDuplicate = (newError, existingErrors) => {
    return existingErrors.some((error) => error.id === newError.id);
  };

  // Conectar con EventSource al montar el componente
  useEffect(() => {
<<<<<<< HEAD
    const eventSource = new EventSource('https://ptgzg54q-7209.use2.devtunnels.ms/api/ErrorLog/stream');
=======
    const eventSource = new EventSource('https://localhost:7209/api/ErrorLog/stream');
>>>>>>> main

    // Al recibir un mensaje, agregar el error al estado
    eventSource.onmessage = (event) => {
      try {
        const newError = JSON.parse(event.data);
        console.log("Nuevo error recibido:", newError);

        setErrors((prevErrors) => {
          // Evitar añadir errores duplicados
          if (isErrorDuplicate(newError, prevErrors)) {
            return prevErrors;
          }
          return [newError, ...prevErrors];
        });
      } catch (parseError) {
        console.error('Error al parsear el nuevo error:', parseError);
      }
    };

    // Manejar errores en EventSource
    eventSource.onerror = (err) => {
      console.error('EventSource error:', err);
      eventSource.close();
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
      eventSource.close();
    };
  }, []);

  // Filtrar errores según el estado del filtro
  const [filter, setFilter] = useState('');
  const filteredErrors = useMemo(() => {
    return errors.filter((error) => {
      if (filter === 'controlled') {
        return error.isRetriable === true;
      } else if (filter === 'exception') {
        return error.isRetriable === false;
      }
      return true; // Mostrar todos si no hay filtro
    });
  }, [errors, filter]);

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">Dashboard de Errores en Tiempo Real</h1>

      {/* Filtro de errores */}
      <div className="mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-2 md:mb-0">
          <label className="text-md text-gray-200 mr-2">Filtrar por tipo:</label>
          <select
            className="p-1 bg-gray-800 text-gray-100 border border-gray-700 rounded text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="controlled">Errores Controlados</option>
            <option value="exception">Excepciones</option>
          </select>
        </div>
      </div>

      {/* Tabla de Errores */}
      <div className="bg-gray-800 rounded-lg shadow p-4 overflow-auto">
        {filteredErrors.length > 0 ? (
          <table className="min-w-full bg-gray-800 text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 border-b border-gray-700 text-left text-gray-300">ID</th>
                <th className="px-2 py-1 border-b border-gray-700 text-left text-gray-300">Número de Tarjeta</th>
                <th className="px-2 py-1 border-b border-gray-700 text-left text-gray-300">Fecha de Compra</th>
                <th className="px-2 py-1 border-b border-gray-700 text-left text-gray-300">Monto</th>
                <th className="px-2 py-1 border-b border-gray-700 text-left text-gray-300">Estado</th>
                <th className="px-2 py-1 border-b border-gray-700 text-left text-gray-300">Mensaje</th>
                <th className="px-2 py-1 border-b border-gray-700 text-left text-gray-300">Es Reintentable</th>
              </tr>
            </thead>
            <tbody>
              {filteredErrors.map((error) => (
                <tr
                  key={error.id}
                  className={`border-b border-gray-700 ${
                    error.isRetriable
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <td className="px-2 py-1">{error.id || 'N/A'}</td>
                  <td className="px-2 py-1">{error.cardNumber || 'N/A'}</td>
                  <td className="px-2 py-1">
                    {error.purchaseDate ? new Date(error.purchaseDate).toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-2 py-1">
                    ${typeof error.amount === 'number' ? error.amount.toFixed(2) : 'N/A'}
                  </td>
                  <td className="px-2 py-1">{error.status || 'N/A'}</td>
                  <td className="px-2 py-1">{error.errorMessage || 'N/A'}</td>
                  <td className="px-2 py-1 flex items-center">
                    {error.isRetriable ? (
                      <>
                        <FaInfoCircle className="mr-1 text-lg" />
                        Sí
                      </>
                    ) : (
                      <>
                        <FaExclamationTriangle className="mr-1 text-lg" />
                        No
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400 text-sm">No hay errores para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ErrorDashboard;
