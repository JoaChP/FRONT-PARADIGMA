import { useEffect, useState } from 'react';
import { getErrorLogs, sendErrorLog } from '../services/apiService';

export const ErrorLogger = () => {
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [stackTrace, setStackTrace] = useState('');
  const [errorType, setErrorType] = useState('');

  useEffect(() => {
    fetchErrorLogs();
  }, []);

  const fetchErrorLogs = async () => {
    try {
      const logs = await getErrorLogs();
      setErrors(logs);
    } catch (error) {
      console.error("Error fetching error logs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorData = { errorMessage, stackTrace, errorType };
    try {
      await sendErrorLog(errorData);
      fetchErrorLogs(); // Actualiza los logs después de enviar el error
      setErrorMessage('');
      setStackTrace('');
      setErrorType('');
    } catch (error) {
      console.error("Error sending error log:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Error Logger</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label>Error Message:</label>
          <input
            type="text"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label>Stack Trace:</label>
          <textarea
            value={stackTrace}
            onChange={(e) => setStackTrace(e.target.value)}
            className="border p-2 rounded w-full"
            required
          ></textarea>
        </div>
        <div>
          <label>Error Type:</label>
          <input
            type="text"
            value={errorType}
            onChange={(e) => setErrorType(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Send Error
        </button>
      </form>

      <h3 className="text-xl mb-2">Error Logs</h3>
      <ul>
        {errors.map((error) => (
          <li key={error.id} className="border-b mb-2 pb-2">
            <p><strong>Message:</strong> {error.errorMessage}</p>
            <p><strong>Stack Trace:</strong> {error.stackTrace}</p>
            <p><strong>Type:</strong> {error.errorType}</p>
            <p><strong>Status:</strong> {error.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorLogger;
