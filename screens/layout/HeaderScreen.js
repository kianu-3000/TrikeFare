import { View, Text, StyleSheet } from 'react-native';
import { Constants } from '../../constants/constants';

export default function HeaderScreen({ title, bgColor, fontColor }) {
    return (
        <View style={[headerStyle.container, {
            backgroundColor: bgColor,
        }]}>
            <Text style={[headerStyle.text, {
                color: fontColor
            }]}>{title}</Text>
        </View>
    )
}

const headerStyle = StyleSheet.create({
    container: {
        flex: 0,
        padding: Constants.SIZE.HEADINGS,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.PADDING.MEDIUM,

        // iOS shadow
        shadowColor: Constants.COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0,
        shadowRadius: 4.65,

        // Android shadow
        elevation: 10,
    },
    text: {
        fontSize: Constants.SIZE.HEADINGS,
        fontWeight: 'bold',
        letterSpacing: Constants.SIZE.SMALL
    }
})