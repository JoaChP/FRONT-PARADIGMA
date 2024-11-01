import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrors } from '../services/apiService';
import ErrorMessage from './ErrorMessage';

const ErrorHandlingMenu = () => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchErrors = async () => {
      try {
        const errorData = await getErrors();
        setErrors(errorData);
      } catch (err) {
        console.log('Error al cargar los datos de errores:', err);
        setFetchError('Error al cargar los datos de errores');
      } finally {
        setLoading(false);
      }
    };

    fetchErrors();
  }, []);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (fetchError) return <ErrorMessage message={fetchError} />;

  const handleErrorClick = (error) => {
    // Asumiendo que cada error tiene un 'id' único
    navigate(`/errors/${error.id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Menú de Manejo de Errores</h1>
      <ul className="space-y-4">
        {errors.map((error) => (
          <li
            key={error.id}
            onClick={() => handleErrorClick(error)}
            className="cursor-pointer bg-white p-4 rounded-lg shadow hover:bg-gray-100 transition"
          >
            <div className="text-gray-800 font-semibold">
              {error.title || `Error ${error.id}`}
            </div>
            <div className="text-gray-600 text-sm">{error.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorHandlingMenu;
