import { View, Text, StyleSheet } from 'react-native';
import { Constants } from '../../constants/constants';

export default function FooterScreen({ title, bgColor, fontColor }) {
    return (
        <View style={[footerStyle.container, {
            backgroundColor: bgColor,
        }]}>
            <Text style={[footerStyle.text, {
                color: fontColor
            }]}>{title}</Text>
        </View>
    )
}

const footerStyle = StyleSheet.create({
    container: {
        flex: 0,
        padding: Constants.SIZE.HEADINGS,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        paddingBottom: 60
    },
    text: {
        fontSize: Constants.SIZE.HEADINGS,
        fontWeight: 'bold',
        letterSpacing: Constants.SIZE.SMALL
    }
})