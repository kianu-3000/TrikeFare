import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { Constants } from '../constants/constants';

const CustomRadioButton = ({setGender}) => {
    const [selected, setSelected] = useState('option1');
    const chooseGender = (option) => {
        setSelected(option);
        setGender(option);
    }

    const options = [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
    ];

    return (
        <View style={{flexDirection: 'row', gap: Constants.SIZE.REGULAR}}>
            {options.map(option => (
                <TouchableOpacity
                    key={option.value}
                    style={styles.radioContainer}
                    onPress={() => chooseGender(option.value)}
                >
                    <View style={styles.circle}>
                        {selected === option.value && <View style={styles.checkedCircle} />}
                    </View>
                    <CustomText style={[{fontFamily: 'Montserrat-Bold'}]}>{option.label}</CustomText>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    circle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Constants.COLORS.RED,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkedCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Constants.COLORS.RED,
    },
});

export default CustomRadioButton;
