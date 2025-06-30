import { View, Text, StyleSheet } from 'react-native';
import { Constants } from '../../constants/constants';
export default function Profile(){
    return(
        <View style={{backgroundColor: Constants.COLORS.GRAYISH_WHITE, flex: 1}}>
            <Text>Profile</Text>
        </View>
    )
}