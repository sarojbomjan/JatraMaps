// utils/auth.js
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };