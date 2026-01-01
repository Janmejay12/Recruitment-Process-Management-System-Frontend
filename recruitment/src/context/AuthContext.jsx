import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Restore auth on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login using backend response
  const login = (loginResponse) => {
    const { token, fullName, email, roles } = loginResponse;

    const decoded = jwtDecode(token);

    const userData = {
      id: decoded.nameid,
      fullName,
      email,
      roles
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const hasRole = (role) => {
    if (!user?.roles) return false;
    return user.roles.some(
      r => r.toLowerCase() === role.toLowerCase()
    );
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
