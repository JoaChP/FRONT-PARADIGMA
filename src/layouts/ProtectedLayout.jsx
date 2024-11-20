// src/layouts/ProtectedLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useAuth from '../auth/hooks/useAuth';

/**
 * Layout para rutas protegidas que incluye el Sidebar.
 * @returns {JSX.Element} - Layout con Sidebar y contenido de las rutas protegidas.
 */
const ProtectedLayout = () => {
  const { auth } = useAuth();

  // Opcional: Puedes manejar el estado de carga aquí si es necesario
  if (auth.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
