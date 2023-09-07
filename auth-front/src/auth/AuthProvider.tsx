import { useContext, createContext, useState, useEffect } from "react";
import { AuthResponse } from "../types/types";
// this is the component which validate if there is authentication or not
// to the protected routes
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  //const [refreshToken, setRefreshToken] = useState<string>("");

  useEffect(() => {}, []);

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }
  }

  function saveUser(userData: AuthResponse) {
    setAccessToken(userData.body.accessToken);
    //setRefreshToken(userData.body.refreshToken);

    localStorage.setItem("token", JSON.stringify(userData.body.refreshToken));
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
