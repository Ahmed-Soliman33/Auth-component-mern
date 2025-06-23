// Provider for managing authentication state
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import TokenRefreshHandler from "./TokenRefreshHandler";
import { useApi } from "../api/useApi";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const { request } = useApi();

  // Fetch user data on mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await request("/api/auth/me");
        setToken(response.data.token || null);
      } catch (error) {
        setToken(null);
      }
    };
    fetchMe();
  }, [request]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <TokenRefreshHandler token={token} setToken={setToken} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
