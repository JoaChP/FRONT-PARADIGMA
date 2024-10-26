const ErrorMessage = ({ message }) => {
    return (
      <div className="bg-red-500 text-white p-4 rounded">
        <p>Error: {message}</p>
      </div>
    );
  };
  
  export default ErrorMessage;
  