import { goToLogin } from "./authUtils";

const Login = () => {


  /**
   * Maneja el inicio de sesión externo.
   */
  const handleExternalLogin = () => {
    goToLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Iniciar Sesión</h2>
        {/* Botón para login externo */}
        <div className="mt-4">
          <button
            onClick={handleExternalLogin}
            className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Iniciar Sesión con el Sistema Externo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
