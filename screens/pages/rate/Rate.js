import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
import { useState } from 'react';



export default function Rating() {
    const [star, setStar] = useState([
        { color: Constants.COLORS.WHITE },
        { color: Constants.COLORS.WHITE },
        { color: Constants.COLORS.WHITE },
        { color: Constants.COLORS.WHITE },
        { color: Constants.COLORS.WHITE }
    ]);
    const starColor = (arrLen) => {
        for (let x = 0; x < arrLen; x++) {
            star[arrLen].color = Constants.COLORS.YELLOW
            console.log("Color: " + star[arrLen].color);
        }
        console.log("Len: " + arrLen)
    }

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.container]}>
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>Rate Us</CustomText>
            </View>

            {/* Main Content */}
            <View style={[style.main_container]}>
                <View>
                    <View style={[style.main_card]}>
                        <CustomText style={[style.text]}>
                            Rate us to improve this app!
                        </CustomText>
                        <View style={[style.card_star]}>

                            {
                                star.map((icon, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => { starColor(index) }}>
                                            <Ionicons name={'star'} size={20} color={icon.color} style={[style.icon]} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={[style.main_card]}>
                        <CustomText style={[style.text]}>
                            How’s your experience to use this app??
                        </CustomText>
                    </View>
                </View>

                <View style={[style.textAreaContainer]}>
                    <TextInput
                        placeholder="Enter your message..."
                        multiline={true}          // ✅ Allows multiple lines
                        numberOfLines={4}         // ✅ Sets initial height
                        style={style.textArea}
                    />
                </View>
                <View style={[style.main_card]}>
                    <CustomText style={[style.text]}>
                        What is your suggestion to improve more this app?
                    </CustomText>
                </View>
                <View style={[style.textAreaContainer]}>
                    <TextInput
                        placeholder="Enter your message..."
                        multiline={true}          // ✅ Allows multiple lines
                        numberOfLines={4}         // ✅ Sets initial height
                        style={style.textArea}
                    />
                </View>
            </View>


            {/* Footer Content */}
            <View style={[style.footer_container]}>
                <TouchableOpacity style={[style.button]}>
                    <CustomText style={[style.text]}>
                        Submit
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        padding: Constants.PADDING.REGULAR
    },
    footer_container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Constants.PADDING.SMALL
    },
    button: {
        padding: Constants.PADDING.SMALL,
        paddingLeft: Constants.PADDING.MEDIUM,
        paddingRight: Constants.PADDING.MEDIUM,
        borderRadius: Constants.BORDERS.RADIUS_NORMAL,
        backgroundColor: Constants.COLORS.RED
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        color: Constants.COLORS.WHITE,
        fontSize: Constants.SIZE.REGULAR,
        textAlign: 'center'
    },
    main_card: {
        justifyContent: 'center',
        backgroundColor: Constants.COLORS.RED,
        padding: Constants.PADDING.REGULAR,
        borderRadius: Constants.BORDERS.RADIUS_NORMAL,
        marginTop: Constants.MARGIN.SMALL
    },
    card_star: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    icon: {
        fontSize: Constants.SIZE.MEDIUM,
    },
    textArea: {
        height: '100%',
        textAlignVertical: 'top',
        borderRadius: Constants.BORDERS.RADIUS_NORMAL,
        fontFamily: 'Montserrat'
    },
    textAreaContainer: {
        flex: 1, marginTop: Constants.MARGIN.SMALL,
        backgroundColor: Constants.COLORS.WHITE,
        padding: Constants.PADDING.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_SMALL
    }
})