import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isLoggedIn: boolean;
  logout: (navigation: any) => void;
  login: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    setIsLoggedIn(true);
  };

  const logout = async (navigation: any) => {
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);