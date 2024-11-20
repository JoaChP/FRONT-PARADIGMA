// src/auth/components/AuthRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
/**
 * Componente para manejar la redirección después de la autenticación externa.
 */
const AuthRedirect = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token'); // Asumiendo que el token viene como 'token' en la query
      if (token) {
        try {
          await loginWithToken(token);
          navigate('/stats');
        } catch (error) {
          console.error('Error al iniciar sesión con token:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleAuth();
  }, [navigate, loginWithToken]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <p className="text-white">Procesando autenticación...</p>
    </div>
  );
};

export default AuthRedirect;
