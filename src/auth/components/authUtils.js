
export const goToLogin = () => {
    const loginUrl = 'https://eshop-loggin.vercel.app'; // URL del sistema de login externo
    const redirectUrl = `${window.location.origin}/auth-redirect`; // Ruta en tu aplicación para manejar el token
    window.location.href = `${loginUrl}/?redirect=${encodeURIComponent(redirectUrl)}`;
  };
  