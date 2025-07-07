import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
export default function History() {
    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.header]}>
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>History</CustomText>
            </View>

            {/* Choices */}
            <View style={globalStyle.choicesContainer}>
            </View>

            {/* Main Content */}
            <View></View>
        </View>
    )
}