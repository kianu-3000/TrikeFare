import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function CustomText(props) {

    const [fontsLoaded] = useFonts({
        'Blinker-Bold': require("../assets/fonts/Blinker-Bold.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf")
    });

    if (!fontsLoaded) {
        return null; // or a loading screen
    }
    return (
        <Text {...props} style={[props.style]}>
            {props.children}
        </Text>
    );
}