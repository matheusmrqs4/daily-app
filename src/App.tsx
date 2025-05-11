import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../src/contexts/AuthContext';
import MainNavigator from '../src/navigation/MainNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
