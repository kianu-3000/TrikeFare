import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from './Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';


function withLayout(ScreenComponent) {
    return (props) => (
        <Layout>
            <ScreenComponent {...props} />
        </Layout>
    );
}

export default function MainLayout() {
    const InnerStack = createNativeStackNavigator();

    return (
        <InnerStack.Navigator screenOptions={{ headerShown: false, animation: 'none' }} initialRouteName="Home">
            <InnerStack.Screen name="Home" component={withLayout(Home)} />
            <InnerStack.Screen name="Profile" component={withLayout(Profile)} />
        </InnerStack.Navigator>
    );
}