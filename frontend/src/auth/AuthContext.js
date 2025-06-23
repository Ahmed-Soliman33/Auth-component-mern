import { createContext, useContext } from "react";

// Creating the AuthContext for sharing auth state across components
const AuthContext = createContext({ token: null, setToken: () => {} });

// Custom hook to access the auth context
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export default AuthContext;
