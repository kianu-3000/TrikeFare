import { Constants } from "../constants/constants";
import { StyleSheet, View, TextInput } from "react-native";
import { useFonts } from 'expo-font';
import CustomText from "./CustomText";

const CustomMessage = ({ fontFamily, color, message }) => {

    const [fontsLoaded] = useFonts({
        'Blinker-Bold': require("../assets/fonts/Blinker-Bold.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf"),
        'Montserrat': require("../assets/fonts/Montserrat-Regular.ttf")
    });

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    return (
        <View style={[style.message, { backgroundColor: color }]}>
            <CustomText style={[style.messageText, {color: Constants.COLORS.WHITE}]}>{message}</CustomText>
        </View>
    )
}

const style = StyleSheet.create({
    message: {
        marginBottom: Constants.MARGIN.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageText: {
        fontFamily: 'Montserrat-Bold',
        color: Constants.COLORS.WHITE
    }
})

export { CustomMessage };