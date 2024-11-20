// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * @returns {Object} - Objeto que contiene el estado de autenticación y las funciones para login y logout.
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
