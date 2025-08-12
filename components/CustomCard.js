import { Constants } from "../constants/constants";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import CustomText from "./CustomText";
import { fonts } from "../utils/fonts";
import { Ionicons } from '@expo/vector-icons';

const CustomCard = ({ details, pressFunc }) => {

    const [fontsLoaded] = useFonts(fonts);

    if (!fontsLoaded) {
        return null; // or a loading screen
    }

    return (
        <View style={[style.card]}>

            <View style={style.icon}>
                <Ionicons name={'person-circle'} size={32} color={Constants.COLORS.BLACK} />
            </View>

            <View style={style.details}>

                {/* Name */}
                <View style={[{ flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.BLACK }]}>Driver Email: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.driverid}</CustomText>
                </View>

                {/* Date */}
                <View style={[style.details, { flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.RED }]}>Date: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.created_at}</CustomText>
                </View>


                {/* Pick Up Loc */}
                <View style={[style.details, { flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.BLUE }]}>Pickup Location: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.location_from}</CustomText>
                </View>

                {/* Drop off Loc */}
                <View style={[style.details, { flexDirection: 'row' }]}>
                    <CustomText style={[style.messageLabel, { color: Constants.COLORS.RED }]}>Drop-off Location: </CustomText>
                    <CustomText style={[style.messageValue, { color: Constants.COLORS.BLACK }]}>{details.location_to}</CustomText>
                </View>

            </View>
            <View style={style.more}>
                <TouchableOpacity onPress={pressFunc}>
                    <Ionicons name={'ellipsis-horizontal'} size={24} color={Constants.COLORS.BLACK} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    icon: {
        marginRight: Constants.MARGIN.SMALL
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Constants.COLORS.WHITE,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        padding: Constants.PADDING.SMALL,
        marginBottom: Constants.MARGIN.SMALL
    },
    messageLabel: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.LABELS
    },
    messageValue: {
        fontFamily: 'Montserrat',
        fontSize: Constants.SIZE.LABELS
    },
    details: {
        flex: 1,
    },
    more: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})

export { CustomCard };