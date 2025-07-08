import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Constants } from '../../constants/constants';
import { globalStyle } from '../../utils/styles';
import { Ionicons } from '@expo/vector-icons';

import CustomText from '../../components/CustomText';
import { loginStyle } from './loginPageStyles';

export default function LoginPage({ login }) {
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
                </View>
                <View style={loginStyle.main}>

                    <View style={loginStyle.formContainer}>

                        <View style={loginStyle.inputContainer}>
                            <Ionicons name={'person'} size={20} color={Constants.COLORS.BLACK} style={loginStyle.icon} />
                            <TextInput style={loginStyle.formInput} placeholder='Enter Username' />
                        </View>


                        <View style={loginStyle.inputContainer}>
                            <Ionicons name={'lock-closed'} size={20} color={Constants.COLORS.BLACK} style={loginStyle.icon} />
                            <TextInput style={loginStyle.formInput} placeholder='Enter Password' secureTextEntry={true} />
                        </View>

                        <View style={loginStyle.misc}>
                            <TouchableOpacity>
                                <Text style={loginStyle.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={login}>
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