import { Constants } from "../constants/constants";
import { StyleSheet, View, TextInput } from "react-native";
import { useFonts } from 'expo-font';
import { fonts } from "../utils/fonts";

const CustomInput = ({ fontFamily, color, isSecure, inputValue, value, placeholderValue, flexValue, keyboardTypeValue = 'default' }) => {

    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    return (
        <View style={[style.message, { backgroundColor: color, flex: flexValue}]}>
            <TextInput
                style={[style.messageText, { fontFamily: fontFamily, padding: Constants.PADDING.SMALL }]}
                secureTextEntry={isSecure}
                value={value}
                onChangeText={inputValue}
                placeholder={placeholderValue}
                keyboardType={keyboardTypeValue}
                placeholderTextColor={Constants.COLORS.BLACK}  />
        </View>
    )
}

const style = StyleSheet.create({
    message: {
        marginBottom: Constants.MARGIN.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_LARGE,
    },
    messageText: {
        fontSize: Constants.SIZE.REGULAR,
        // textAlign: 'center',
        color: Constants.COLORS.BLACK
    }
})

export { CustomInput };