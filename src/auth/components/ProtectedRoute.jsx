// src/auth/components/ProtectedRoute.jsx
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { goToLogin } from './authUtils';

/**
 * Componente para proteger rutas que requieren autenticación.
 * @param {Object} props - Propiedades del componente.
 * @param {JSX.Element} props.children - Componente hijo que se renderizará si el usuario está autenticado.
 * @returns {JSX.Element|null} - Componente protegido o redirección a login externo.
 */
const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth.loading) {
    // Opcional: Mostrar un spinner o pantalla de carga mientras se verifica la autenticación
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    goToLogin();
    return null; // Evita renderizar cualquier contenido hasta que sea redirigido
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
