import { useEffect, useState } from 'react';
import { getErrors } from '../services/apiService';
import ErrorMessage from './ErrorMessage';

const ErrorList = () => {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchErrors = async () => {
      try {
        const errorData = await getErrors();
        setErrors(errorData);
      } catch (err) {
        console.log('Error al cargar los datos de errores:', err);
        setError('Error al cargar los datos de errores');
      } finally {
        setLoading(false);
      }
    };

    fetchErrors();
  }, []);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Errores (Formato JSON)</h1>
      <div className="space-y-4">
        {errors.map((errorObj) => (
          <pre
            key={errorObj.id}
            className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm shadow-lg"
          >
            {JSON.stringify(errorObj, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default ErrorList;
