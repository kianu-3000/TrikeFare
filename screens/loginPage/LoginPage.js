import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useContext } from 'react';
import { Constants } from '../../constants/constants';
import { globalStyle } from '../../utils/styles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomText from '../../components/CustomText';
import { loginStyle } from './loginPageStyles';
import { AuthContext } from '../../context/AuthContext.js';
import { loginTest } from '../../services/service.js';

export default function LoginPage() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(false);
    const [data, setData] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    // const [loadingBar, serLoadingBar] = useState(false);

    // call api login
    const loginUser = async () => {

        const apiResult = await loginTest(username, password);

        if (apiResult.errorMessage) {
            console.log(apiResult.errorMessage);
            setMsg(true);
            setTimeout(() => {
                setMsg(false);
            }, 2000);
            setData(apiResult.errorMessage);
        } else {
            console.log(apiResult.tokenDecoded);
            setMsg(true);
            setData(apiResult.msg);
            await AsyncStorage.setItem('token', apiResult.token);
            setIsAuthenticated(true); // this triggers page change
        }

    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-60}
        >
            <View style={loginStyle.container}>
                {/* Header */}
                <View style={loginStyle.header}>
                    <CustomText style={loginStyle.label}>Hi! Welcome To</CustomText>
                    <CustomText style={loginStyle.label2}>TrikeFare</CustomText>

                    {/* {loadingBar ? <Text>please wait...</Text> : null} */}
                </View>
                <View style={loginStyle.main}>

                    <View style={loginStyle.formContainer}>

                        {msg ? <View style={loginStyle.message}><Text style={loginStyle.messageText}>{data}</Text></View> : null}

                        <View style={loginStyle.inputContainer}>
                            <Ionicons name={'person'} size={20} color={Constants.COLORS.BLACK} style={loginStyle.icon} />
                            <TextInput style={loginStyle.formInput} placeholder='Enter Username' onChangeText={setUserName} />
                        </View>


                        <View style={loginStyle.inputContainer}>
                            <Ionicons name={'lock-closed'} size={20} color={Constants.COLORS.BLACK} style={loginStyle.icon} />
                            <TextInput style={loginStyle.formInput} placeholder='Enter Password' secureTextEntry={true} onChangeText={setPassword} />
                        </View>

                        <View style={loginStyle.misc}>
                            <TouchableOpacity>
                                <Text style={loginStyle.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => { loginUser() }}>
                            <Text style={loginStyle.loginBtn}>Login</Text>
                        </TouchableOpacity>

                        <View style={loginStyle.createAccount}>
                            <Text style={loginStyle.label3}>Don't have an account? </Text>
                            <TouchableOpacity><Text style={loginStyle.createAccountLabel}>Create an account</Text></TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}