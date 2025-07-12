import React, { useState, useEffect, children, useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainLayout from '../screens/MainLayout';
import LoginPage from '../screens/loginPage/LoginPage';
import { AuthContext, AuthProvider } from '../context/AuthContext.js';

const StackNav = createNativeStackNavigator();

function Navigation() { // this is equal to browser router
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <NavigationContainer>
            <StackNav.Navigator>
                {
                    isAuthenticated ?
                        (<StackNav.Screen name='MainPage' options={{ headerShown: false }}>
                            {(props) => <MainLayout {...props} />}
                        </StackNav.Screen>)
                        :
                        (<StackNav.Screen name='LoginPage' options={{ headerShown: false }}>
                            {(props) => <LoginPage {...props} />}
                        </StackNav.Screen>)
                }
            </StackNav.Navigator>
        </NavigationContainer>
    );
}
export { Navigation };
