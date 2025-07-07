import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import CustomText from '../../../components/CustomText';
export default function Profile() {
    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, style.view]}>
            {/* Header */}
            <View style={style.headerContainer}>
                <CustomText style={style.textTitle}>Profile</CustomText>
            </View>

            {/* Choices */}
            <View style={style.choicesContainer}>
            </View>

            {/* Main Content */}
            <View></View>
        </View>
    )
}

const style = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: Constants.PADDING.REGULAR
    },

    // Header
    headerContainer: {  
        flex: 0,
        padding: Constants.PADDING.REGULAR,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Constants.COLORS.RED
    },
    textTitle: {
        color: Constants.COLORS.WHITE,
        fontSize: Constants.SIZE.HEADINGS,
        fontFamily: 'Montserrat-Bold'
    },

    // Choices
    choicesContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    choices: {
        flex: 1,
        padding: Constants.PADDING.SMALL,
        backgroundColor: Constants.COLORS.DARK_RED,
        justifyContent: 'center',
        alignItems: 'center'
    }
})