import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import Logs from './pages/Logs';
// import Reports from './pages/Reports';
import Stats from './components/Stats';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} /> */}
            {/* <Route path="/reports" element={<Reports />} /> */}
            <Route path="/statisti" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
