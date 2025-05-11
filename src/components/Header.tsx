import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ title }: { title: string }) => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <View style={{ padding: 16, backgroundColor: '#C2FCFF', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 18 }}>{title}</Text>
      {isLoggedIn && <Button title="Logout" onPress={logout} />}
    </View>
  );
};

export default Header;
