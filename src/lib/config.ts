export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const AUTH_ENDPOINTS = {
  me: `${API_BASE_URL}/auth/me`,
  startLogin: `${API_BASE_URL}/auth/totvs/login`,
  callback: `${API_BASE_URL}/auth/callback`,
  logout: `${API_BASE_URL}/auth/logout`,
};



