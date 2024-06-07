import React, { createContext, useState, ReactNode } from 'react';
import { UserService } from '../services';
import { useNavigate } from 'react-router-dom';
import { DEVICE_PAGE_PATH } from '../constants';

interface AuthContextType {
  authToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const response = await UserService.login(email, password);

    if (!response) {
      return false;
    }

    const { token } = response;

    setAuthToken(token);
    navigate(DEVICE_PAGE_PATH);

    return true;
  };

  const logout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };