import React, { useState } from 'react';
import { TextInput, Button, View, Text, TouchableOpacity } from 'react-native';
import { registerUser } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      const userData = await registerUser({ name, email, password });
      await AsyncStorage.setItem('userToken', userData.token);
      setSuccess('Cadastro realizado com sucesso!');
      navigation.navigate('Login');
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
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
      <Button title="Register" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue', textAlign: 'center' }}>
          Já tem uma conta? Faça login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;