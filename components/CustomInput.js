import { Constants } from "../constants/constants";
import { StyleSheet, View, TextInput } from "react-native";
import { useFonts } from 'expo-font';
import { fonts } from "../utils/fonts";

const CustomInput = ({ fontFamily, color, isSecure, inputValue, placeholderValue, flexValue, keyboardTypeValue = 'default' }) => {

    const [fontsLoaded] = useFonts(fonts);

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