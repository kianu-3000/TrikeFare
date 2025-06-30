import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Constants } from '../../constants/constants';
import { Ionicons } from '@expo/vector-icons';


export default function FooterScreen({ title, bgColor, fontColor }) {
    const navigation = useNavigation();
    return (
        <View style={[footerStyle.container, {
            backgroundColor: bgColor,
        }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home" size={Constants.SIZE.LARGE} color={Constants.COLORS.BLACK} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person-circle" size={Constants.SIZE.LARGE} color={Constants.COLORS.BLACK} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Ionicons name="time" size={Constants.SIZE.LARGE} color={Constants.COLORS.BLACK} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Ionicons name="newspaper" size={Constants.SIZE.LARGE} color={Constants.COLORS.BLACK} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Ionicons name="star" size={Constants.SIZE.LARGE} color={Constants.COLORS.BLACK} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Ionicons name="book" size={Constants.SIZE.LARGE} color={Constants.COLORS.BLACK} />
            </TouchableOpacity>

        </View>
    )
}

const footerStyle = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        padding: Constants.SIZE.HEADINGS,
        justifyContent: 'space-between',
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