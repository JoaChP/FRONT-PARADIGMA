import { useState } from 'react';
import { FaChartBar } from 'react-icons/fa';

const Stats = () => {
  const [filter, setFilter] = useState("controlled");

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-gray-100 mb-6">Estadísticas de Errores</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <FaChartBar className="text-green-500 text-5xl mb-4 mx-auto" />
        <p className="text-gray-400 text-center mb-4">
          {filter === "controlled"
            ? "Gráficas de errores controlados irán aquí."
            : "Gráficas de excepciones irán aquí."}
        </p>
        <div className="flex justify-around mt-6">
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === "controlled"
                ? "bg-green-500 text-gray-100"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
            onClick={() => handleFilterChange("controlled")}
          >
            Errores Controlados
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === "exception"
                ? "bg-red-500 text-gray-100"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
            onClick={() => handleFilterChange("exception")}
          >
            Excepciones
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
