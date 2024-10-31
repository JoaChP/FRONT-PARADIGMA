import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [isConnected, setIsConnected] = useState(true); // Indicador de conexión

  return (
    <aside className="bg-blue-950 h-screen w-64 shadow-lg">
      <div className="flex flex-col h-full py-6 space-y-8">
        {/* Título del Sidebar */}
        <div className="text-white font-bold text-2xl px-6">
          Error Handling Monitor
        </div>

        {/* Indicador de Conexión */}
        <div className={`text-lg px-6 ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          {isConnected ? "Conectado" : "Desconectado"}
        </div>

        {/* Menú de Enlaces para Temas de Manejo de Errores */}
        <nav className="flex flex-col space-y-6 px-6 text-lg">
          <Link to="/error-log" className="text-white hover:text-gray-200">
            Log de Errores  
          </Link>
        </nav>
        <nav className="flex flex-col space-y-6 px-6 text-lg">
          <Link to="/dashboard" className="text-white hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/stats" className="text-white hover:text-gray-200">
            Estadísticas
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
