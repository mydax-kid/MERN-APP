import { useContext, useState } from 'react';
import authService from './authService';

const AuthContext = React.createContext();

export const useGlobal = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      setIsLoading(false);
      setIsSuccess(true);
      setUser(response);
    } 
    catch (error) {
      setIsLoading(false);
      setIsError(true);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(message);
      setUser(null);
    }
  };

  const login = async (user) => {
    try {
      setIsLoading(true);
      const response = await authService.login(user);
      setIsLoading(false);
      setIsSuccess(true);
      setUser(response);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(message);
      setUser(null);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setMessage('');
  };

  const contextValue = {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
    register,
    login,
    logout,
    reset,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
