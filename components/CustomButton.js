import { Constants } from "../constants/constants";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';

import CustomText from "./CustomText";

const CustomButton = ({ color, fontSize, fnEvent, onPress }) => {

    const [fontsLoaded] = useFonts({
        'Blinker-Bold': require("../assets/fonts/Blinker-Bold.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf"),
        'Montserrat': require("../assets/fonts/Montserrat-Regular.ttf")
    });

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    return (
        <View style={[style.container]}>
            <TouchableOpacity onPress={onPress}>
                <CustomText style={[style.text, {
                    backgroundColor: color,
                    fontSize: fontSize,
                }]}>
                    Create Account
                </CustomText>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        color: Constants.COLORS.WHITE,
        padding: Constants.PADDING.SMALL,
        paddingLeft: Constants.PADDING.MEDIUM,
        paddingRight: Constants.PADDING.MEDIUM,
        borderRadius: Constants.BORDERS.RADIUS_SMALL
    }
})

export { CustomButton };