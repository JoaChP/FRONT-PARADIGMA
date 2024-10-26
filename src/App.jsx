import Navbar from './components/Navbar';
import ErrorList from './components/ErrorList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ErrorList />
    </div>
  );
};

export default App;
