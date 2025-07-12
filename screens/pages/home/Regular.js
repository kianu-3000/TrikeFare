
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { Constants } from '../../../constants/constants';
import CustomText from '../../../components/CustomText';
import { AuthContext } from '../../../context/AuthContext.js';

export function RegularPage() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        setIsAuthenticated(false);
    }
    return (
        <View style={{ flex: 1, padding: Constants.PADDING.REGULAR }}>
            <CustomText>Regular</CustomText>
            <TouchableOpacity onPress={logOut}>
                <CustomText>
                    LogOut
                </CustomText>
            </TouchableOpacity>
        </View>
    )
}