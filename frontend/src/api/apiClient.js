// Base API client for making authenticated requests
import { useAuth } from "@auth";

// CSRF-required endpoints
const CSRF_REQUIRED_ENDPOINTS = [
  "/api/v1/auth/signup",
  "/api/auth/login",
  "/api/auth/logout",
];

// Fetch CSRF token from server
const fetchCsrfToken = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/csrf-token`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch CSRF token");
  return data.csrfToken;
};

// Main API fetch function
export const apiFetch = async (endpoint, options = {}, token = null) => {
  const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  // Add Authorization header if token is provided
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Add CSRF token for required endpoints
  if (CSRF_REQUIRED_ENDPOINTS.includes(endpoint) && options.method !== "GET") {
    const csrfToken = await fetchCsrfToken();
    headers.set("X-CSRF-Token", csrfToken);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // Include cookies for refreshToken
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};
