// Custom hook for making API requests
import { useState, useCallback } from "react";
import { apiFetch } from "./apiClient";
import { useAuth } from "../auth/AuthContext";

export const useApi = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generic API request function
  const request = useCallback(
    async (endpoint, options = {}) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await apiFetch(endpoint, options, token);
        setData(response);
        return response;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  return { data, error, loading, request };
};
