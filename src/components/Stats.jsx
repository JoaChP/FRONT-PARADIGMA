import { FaChartBar } from 'react-icons/fa';

export const Stats = () => (
  <div className="p-6">
    <h2 className="text-2xl font-semibold text-gray-100 mb-4">Estadísticas de Errores</h2>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <FaChartBar className="text-green-500 text-5xl mb-4" />
      <p className="text-gray-300">Gráficas de estadísticas irán aquí.</p>
      
    </div>
  
  </div>
  
);
console.log("Estamos en Stats");
export default Stats;
