
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import CustomText from '../../../components/CustomText';

export default function SpecialPage(){
    return (
        <View style={{flex: 1, padding: Constants.PADDING.REGULAR}}>
            <CustomText>Special</CustomText>
        </View>
    )
}