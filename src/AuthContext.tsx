import React, { createContext, useState } from "react";

interface AuthContextType {
  idToken: string | null;
  login: (idToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [idToken, setToken] = useState<string | null>(null);

  const login = (idToken: string) => setToken(idToken);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ idToken: idToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
