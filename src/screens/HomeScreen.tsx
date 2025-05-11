import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Teste" />
      <View style={{ padding: 16 }}>
        <Text>Tela de daily ficara aqui</Text>
      </View>
    </View>
  );
};

export default HomeScreen;