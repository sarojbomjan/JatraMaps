export const getAccessToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const setTokens = (accessToken, refreshToken = null) => {
  localStorage.setItem("token", accessToken);
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};
