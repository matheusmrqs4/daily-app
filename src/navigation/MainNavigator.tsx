    import React from 'react';
    import { createNativeStackNavigator } from '@react-navigation/native-stack';
    import { useAuth } from '../contexts/AuthContext';
    import RegisterScreen from '../screens/RegisterScreen';
    import LoginScreen from '../screens/LoginScreen';
    import HomeScreen from '../screens/HomeScreen';

    const Stack = createNativeStackNavigator();

    const MainNavigator = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
            <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
            <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            </>
        )}
        </Stack.Navigator>
    );
    };

    export default MainNavigator;
