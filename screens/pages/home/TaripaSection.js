import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomText from '../../../components/CustomText.js';
import { CustomButton } from '../../../components/CustomButton.js';
import { Constants } from '../../../constants/constants.js';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext, useEffect } from 'react';

export function TaripaSection({ navigation, routeName }) {
    return (
        <View>
            <CustomText>Taripa</CustomText>

            <View style={{ alignItems: 'center', marginTop: Constants.MARGIN.REGULAR }}>
                <CustomButton color={Constants.COLORS.RED} fontSize={Constants.SIZE.REGULAR} onPress={() => navigation.navigate(routeName)} text={'Back'} />
            </View>
        </View>
    )
}