// Component for handling token refresh logic
import { useLayoutEffect, useRef } from "react";
import { apiFetch } from "../api/apiClient";

const TokenRefreshHandler = ({ token, setToken }) => {
  const requestInterceptorRef = useRef(null);
  const responseInterceptorRef = useRef(null);

  // Setup request interceptor
  useLayoutEffect(() => {
    requestInterceptorRef.current = async (input, init = {}) => {
      const headers = new Headers(init.headers || {});
      if (token && !init._retry) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return apiFetch(input, { ...init, headers }, token);
    };

    return () => {
      requestInterceptorRef.current = null;
    };
  }, [token]);

  // Setup response interceptor for token refresh
  useLayoutEffect(() => {
    responseInterceptorRef.current = async (input, init = {}) => {
      try {
        const response = await (requestInterceptorRef.current || apiFetch)(
          input,
          { ...init },
        );

        if (response.status === 401 && !init._retry) {
          try {
            const refreshData = await apiFetch("/api/auth/refresh-token", {
              method: "GET",
            });
            const newToken = refreshData.token;
            setToken(newToken);

            // Retry original request with new token
            const newHeaders = new Headers(init.headers || {});
            newHeaders.set("Authorization", `Bearer ${newToken}`);
            return apiFetch(input, {
              ...init,
              headers: newHeaders,
              _retry: true,
            });
          } catch (refreshError) {
            setToken(null);
            throw refreshError;
          }
        }
        return response;
      } catch (error) {
        throw error;
      }
    };

    return () => {
      responseInterceptorRef.current = null;
    };
  }, [token, setToken]);

  return null;
};

export default TokenRefreshHandler;
