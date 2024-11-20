// src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext();

/**
 * Proveedor de autenticación que maneja el estado de autenticación y provee funciones de login y logout.
 */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    const storedToken = localStorage.getItem('token');

    if (tokenFromUrl) {
      try {
        const user = jwtDecode(tokenFromUrl);
        localStorage.setItem('token', tokenFromUrl);
        setAuth({
          isAuthenticated: true,
          token: tokenFromUrl,
          user,
          loading: false,
        });
        // Limpia el token de la URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('Token inválido en la URL:', error);
        setAuth({
          isAuthenticated: false,
          token: null,
          user: null,
          loading: false,
        });
      }
    } else if (storedToken) {
      try {
        const user = jwtDecode(storedToken);
        setAuth({
          isAuthenticated: true,
          token: storedToken,
          user,
          loading: false,
        });
      } catch (error) {
        console.error('Token inválido en localStorage:', error);
        setAuth({
          isAuthenticated: false,
          token: null,
          user: null,
          loading: false,
        });
      }
    } else {
      setAuth({
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
      });
    }
  }, []);

  /**
   * Inicia sesión con un token externo.
   * @param {string} token - Token de autenticación.
   */
  const loginWithToken = async (token) => {
    try {
      const user = jwtDecode(token);
      localStorage.setItem('token', token);
      setAuth({
        isAuthenticated: true,
        token,
        user,
        loading: false,
      });
    } catch (error) {
      throw error.message || 'Error al iniciar sesión con token';
    }
  };

  /**
   * Cierra la sesión del usuario.
   */
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
