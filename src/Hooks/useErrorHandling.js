import { useState } from 'react';

export const useErrorHandling = () => {
  const [error, setError] = useState(null);

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return { error, handleError };
};
