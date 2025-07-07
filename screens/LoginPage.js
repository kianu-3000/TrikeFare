import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Constants } from '../constants/constants';
import CustomText from '../components/CustomText';
import { globalStyle } from '../utils/styles';

export default function LoginPage({navigation, login}) {
    return (
        <View style={style.container}>
            {/* Header */}
            <View style={style.header}>
                <CustomText style={style.label}>Hi! Welcome To</CustomText>
                <CustomText style={style.label2}>TrikeFare</CustomText>
            </View>

            <View style={style.main}>

                <CustomText style={{fontFamily: 'Montserrat-Bold'}}>Main</CustomText>
                
                <TouchableOpacity
                    onPress={login}
                >
                    <CustomText>Login</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.COLORS.RED,
    },
    header: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 3,
        borderColor: Constants.COLORS.BLACK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        flex: 0.7,
        marginTop: 10,
        backgroundColor: Constants.COLORS.RED
    },
    label:{
        fontSize: Constants.SIZE.LARGE,
        color: Constants.COLORS.FADED_BLACK,
        fontFamily: 'Blinker-Bold'
    },
    label2:{
        fontSize: Constants.SIZE.HEADINGS,
        color: Constants.COLORS.RED,
        fontFamily: 'Montserrat-Bold'
    }
})