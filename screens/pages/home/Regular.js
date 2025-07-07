
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Constants } from '../../../constants/constants';
import CustomText from '../../../components/CustomText';
import AuthContext from '../../../context/AuthContext';

export default function RegularPage(){
    const { logout } = useContext(AuthContext);
    return (
        <View style={{flex: 1, padding: Constants.PADDING.REGULAR}}>
            <CustomText>Regular</CustomText>
            <TouchableOpacity onPress={logout}>
                <CustomText>
                    LogOut
                </CustomText>
            </TouchableOpacity>
        </View>
    )
}