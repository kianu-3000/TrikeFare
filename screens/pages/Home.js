import { View, Text, StyleSheet } from 'react-native';
import { Constants } from '../../constants/constants';

export default function Home(){
    return(
        <View style={{backgroundColor: Constants.COLORS.GRAYISH_WHITE, flex: 1}}>
            <Text>Homes</Text>
        </View>
    )
}