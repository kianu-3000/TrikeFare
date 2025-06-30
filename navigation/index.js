import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainLayout from '../screens/MainLayout';
const Stack = createNativeStackNavigator(); // this is the function is where the stacking happens

export default function Navigation() { // this is equal to browser router
    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={MainLayout} options={{ headerShown: false, animation: 'none' }} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

export { Navigation };
