import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainLayout from '../screens/MainLayout';

export default function Navigation() { // this is equal to browser router
    return (

        <NavigationContainer>
            <MainLayout/>
        </NavigationContainer>

    );
}
export { Navigation };
