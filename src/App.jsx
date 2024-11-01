import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Stats from './components/Stats';
import ErrorLog from './components/Errolog';
import ErrorDashboard from './components/ErrorDashboard';


const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/stats" element={<Stats />} />
            <Route path="/error-log" element={<ErrorLog />} /> {/* Ruta para ErrorLog */}
            <Route path="/dashboard" element={<ErrorDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
