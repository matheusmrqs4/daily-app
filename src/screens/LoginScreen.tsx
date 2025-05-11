import React, { useState } from 'react';
import { TextInput, Button, View, Text, TouchableOpacity } from 'react-native';
import { loginUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');
      const userData = await loginUser(email, password);
      await login(userData.token);
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
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
      {error !== '' && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
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