import  { useState } from 'react';

export const Navbar = () => {
  const [isConnected, setIsConnected] = useState(true); // Indicador de conexión

  return (
    <nav className="bg-blue-700 py-4 shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center px-6 space-x-8">
        {/* Título del Navbar */}
        <div className="text-white font-bold text-2xl">
          Error Handling Monitor
        </div>

        {/* Indicador de Conexión */}
        <div className={`hidden md:block text-lg ${isConnected ? 'text-green-400' : 'text-red-400'} space-x-4`}>
          {isConnected ? "Conectado" : "Desconectado"}
        </div>

        {/* Menú de Enlaces para Temas de Manejo de Errores */}
        <div className="hidden md:flex space-x-8 text-lg">
          <a href="#dashboard" className="text-white hover:text-gray-200">
            Dashboard
          </a>
          <a href="#logs" className="text-white hover:text-gray-200">
            Logs
          </a>
          <a href="#reports" className="text-white hover:text-gray-200">
            Reportes
          </a>
          <a href="#statistics" className="text-white hover:text-gray-200">
            Estadísticas
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
