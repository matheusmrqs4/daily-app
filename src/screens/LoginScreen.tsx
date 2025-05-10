import React, { useState } from 'react';
import { TextInput, Button, View, Text, TouchableOpacity } from 'react-native';
import { loginUser } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    try {
      setError('');
      setSuccess('');
      const userData = await loginUser(email, password);
      await AsyncStorage.setItem('userToken', userData.token);
      setSuccess('Login realizado com sucesso!');
      navigation.navigate('Register');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado');
      }
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      {error !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
      {success !== '' && <Text style={{ color: 'green', marginBottom: 10 }}>{success}</Text>}
      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue', textAlign: 'center' }}>
          Ainda não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;