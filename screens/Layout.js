import { View, Text, StyleSheet } from 'react-native';
import HeaderScreen from './layout/HeaderScreen';
import { Constants } from '../constants/constants';
import FooterScreen from './layout/FooterScreen';
import { useRoute } from '@react-navigation/native';

export default function Layout({children, navigation}) {
    const route = useRoute();
    return (

        <View style={style.container}>
            <HeaderScreen title={route.name} bgColor={Constants.COLORS.RED} fontColor={Constants.COLORS.WHITE}/>
            <View style={style.main}>
                {children}
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
