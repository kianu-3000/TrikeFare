import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainLayout from '../screens/MainLayout';
import LoginPage from '../screens/loginPage/LoginPage';
import AuthContext from '../context/AuthContext';

const StackNav = createNativeStackNavigator();

export default function Navigation() { // this is equal to browser router
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authContextValue = {
        isAuthenticated,
        login: () => setIsAuthenticated(true),
        logout: () => setIsAuthenticated(false),
    };
    
    return (
        <AuthContext.Provider value={authContextValue}>
            <NavigationContainer>
                <StackNav.Navigator initialRouteName='LoginPage'>
                    {
                        isAuthenticated ?
                            (<StackNav.Screen name='MainPage' options={{ headerShown: false }}>
                                {(props) => <MainLayout {...props} login={() => setIsAuthenticated(false)} />}
                            </StackNav.Screen>)
                            :
                            (<StackNav.Screen name='LoginPage' options={{ headerShown: false }}>
                                {(props) => <LoginPage {...props} login={() => setIsAuthenticated(true)} />}
                            </StackNav.Screen>)
                    }
                </StackNav.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>

    );
}
export { Navigation };
