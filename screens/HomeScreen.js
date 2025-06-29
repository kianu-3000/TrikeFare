import { View, Text, StyleSheet } from 'react-native';
import HeaderScreen from './layout/HeaderScreen';
import { Constants } from '../constants/constants';
import FooterScreen from './layout/FooterScreen';

export default function HomeScreen() {
    return (

        <View style={style.container}>
            <HeaderScreen title={'Home'} bgColor={Constants.COLORS.RED} fontColor={Constants.COLORS.WHITE}/>
            <View style={style.main}>
                <Text style={style.text}>Home Screen</Text>
            </View>
            <FooterScreen title={'Footer'} bgColor={Constants.COLORS.WHITE} fontColor={Constants.COLORS.BLACK}/>
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE
    },
    main: {
        flex: 1
    },
    text: {
        color: Constants.COLORS.BLACK
    }
})
