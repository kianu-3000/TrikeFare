import { Constants } from "../constants/constants";
import { StyleSheet, View, TextInput } from "react-native";
import { useFonts } from 'expo-font';

const CustomInput = ({ fontFamily, color, isSecure, inputValue, placeholderValue, flexValue, keyboardTypeValue = 'default' }) => {

    const [fontsLoaded] = useFonts({
        'Blinker-Bold': require("../assets/fonts/Blinker-Bold.ttf"),
        'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf"),
        'Montserrat': require("../assets/fonts/Montserrat-Regular.ttf")
    });

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    return (
        <View style={[style.message, { backgroundColor: color, flex: flexValue}]}>
            <TextInput
                style={[style.messageText, { fontFamily: fontFamily }]}
                secureTextEntry={isSecure}
                onChangeText={inputValue}
                placeholder={placeholderValue}
                keyboardType={keyboardTypeValue} />
        </View>
    )
}

const style = StyleSheet.create({
    message: {
        marginBottom: Constants.MARGIN.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        padding: 3
    },
    messageText: {
        fontSize: Constants.SIZE.REGULAR,
        textAlign: 'center',
        color: Constants.COLORS.BLACK
    }
})

export { CustomInput };