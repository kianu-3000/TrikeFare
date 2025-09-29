// External imports
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState, useContext, use, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Custom imports
import { Constants } from '../../../constants/constants';
import { createUserStyle } from './CreateUserStyle';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CustomInput } from '../../../components/CustomInput';
import CustomText from '../../../components/CustomText';
import { CustomDropdown } from '../../../components/CustomDropDown';
import { CustomButton } from '../../../components/CustomButton';
import { CustomMessage } from '../../../components/CustomMessage';
import { checkEmptyForms } from '../../../utils/utils';
import { CustomDatePicker } from '../../../components/CustomDatePicker';
import CustomRadioButton from '../../../components/CustomRadioButton';
import { createUser } from '../../../services/service';
import CustomLoading from '../../../components/CustomLoading';
import CustomMessageModal from '../../../components/CustomMessageModal';
import { isEmail, isValidPassword } from '../../../assets/General/Utils';

export default function CreateUserPage({ navigation }) {

    // payload
    const [selectedGender, setSelectedGender] = useState('male');
    const [birthDate, setBirthDate] = useState(new Date());
    const [isCalendarShow, setIsCalendarShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');
    const initialFormData = {
        name: '',
        lastName: '',
        mobile: '',
        idNumber: '',
        password: '',
        reEnterPassword: '',
        email: ''
    };
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        mobile: '',
        idNumber: '',
        password: '',
        reEnterPassword: '',
        gender: '',
        email: ''
    })

    // validations
    const [isPasswordCompare, setPasswordCompare] = useState(true);
    const [isValid, setIsValid] = useState(true);

    const submit = async () => { // submit form to create user
        formData['gender'] = selectedGender;
        const isEmpty = checkEmptyForms(formData);
        // check if there are empty fields
        if (isEmpty) {
            setModalVisible(true)
            setResponseMsg('All fields are required.')
            setResponseStatus(500)
            return;
        }
        if (!isEmail(formData.email)) {
            setModalVisible(true)
            setResponseMsg('Email is invalid.')
            setResponseStatus(500)
            return;
        }
        else if (!isValidPassword(formData.password)) {
            setModalVisible(true)
            setResponseMsg(
                'Password must be 8-24 characters long and include at least one uppercase letter and one number.'
            );
            setResponseStatus(500)
            return;
        }
        else if (formData.password !== formData.reEnterPassword) {
            setModalVisible(true)
            setResponseMsg('Password does not match.')
            setResponseStatus(500)
            return;
        }
        else {
            setIsLoading(true);
            const dataRaw = await createUser(formData);
            setIsLoading(false);
            console.log(JSON.stringify(dataRaw));
            if (dataRaw.status == Constants.STATUS_CODE.INTERNAL_SERVER) {
                setModalVisible(true);
                setResponseStatus(dataRaw.status);
                setResponseMsg(dataRaw.message);
            } else if (dataRaw.status == Constants.STATUS_CODE.OK) {
                setFormData(initialFormData);
                setModalVisible(true);
                setResponseStatus(dataRaw.status);
                setResponseMsg(dataRaw.message);
            } else {
                setModalVisible(true);
                setResponseStatus(dataRaw.status);
                setResponseMsg(dataRaw.message);
            }
        }

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={createUserStyle.mainContainer}>
                {
                    isLoading && <CustomLoading />
                }
                <CustomMessageModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    message={responseMsg}
                    response={responseStatus}
                />
                {/* header */}
                <View style={[createUserStyle.header, { flex: 0.3 }]}>
                    <View style={createUserStyle.navigation}>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={createUserStyle.icon}>
                            <Ionicons name={'caret-back-outline'} size={35} color={Constants.COLORS.WHITE} />
                        </TouchableOpacity>
                    </View>
                    <View style={createUserStyle.headerTitle}>
                        <CustomText style={createUserStyle.headerTitleText}>CREATE YOUR</CustomText>
                        <CustomText style={createUserStyle.headerTitleText}>ACCOUNT</CustomText>
                    </View>
                </View>

                {/* Form */}
                <ScrollView style={{ flex: 1, marginTop: Constants.MARGIN.SMALL }}>
                    <View style={createUserStyle.form}>
                        {/* Name Section */}
                        {
                            !isValid ? <CustomMessage fontFamily={''} color={Constants.COLORS.YELLOW} message={'Please don\'t leave empty inputs!'} /> : null
                        }
                        {/* ID Number section */}
                        <View>
                            <CustomInput
                                fontFamily={'Montserrat'}
                                color={Constants.COLORS.WHITE}
                                isSecure={false}
                                value={formData.email}
                                inputValue={(text) =>
                                    setFormData((prev) => ({ ...prev, email: text }))}
                                placeholderValue={'Email'}
                                flexValue={0}
                                keyboardTypeValue='numeric'
                                style={[createUserStyle.inputText]} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: Constants.SIZE.REGULAR }}>
                            {/* First Name */}
                            <View style={{ flex: 1 }}>
                                <CustomInput
                                    fontFamily={'Montserrat'}
                                    color={Constants.COLORS.WHITE}
                                    isSecure={false}
                                    value={formData.name}
                                    inputValue={(text) =>
                                        setFormData((prev) => ({ ...prev, name: text }))}
                                    placeholderValue={'First Name'}
                                    flexValue={0}
                                    style={[createUserStyle.inputText]} />
                            </View>
                            {/* Last Name */}
                            <View style={{ flex: 1 }}>
                                <CustomInput
                                    fontFamily={'Montserrat'}
                                    color={Constants.COLORS.WHITE}
                                    isSecure={false}
                                    value={formData.lastName}
                                    inputValue={(text) =>
                                        setFormData((prev) => ({ ...prev, lastName: text }))}
                                    placeholderValue={'Last Name'}
                                    flexValue={0}
                                    style={[createUserStyle.inputText]} />
                            </View>
                        </View>
                        {/* Mobile Number section */}
                        <View>
                            <CustomInput
                                fontFamily={'Montserrat'}
                                color={Constants.COLORS.WHITE}
                                isSecure={false}
                                value={formData.mobile}
                                inputValue={(text) =>
                                    setFormData((prev) => ({ ...prev, mobile: text }))}
                                placeholderValue={'Mobile Number'}
                                flexValue={0}
                                keyboardTypeValue='numeric'
                                style={[createUserStyle.inputText]} />
                        </View>

                        {/* Gender */}
                        <View style={{
                            padding: Constants.PADDING.SMALL,
                            borderRadius: Constants.BORDERS.RADIUS_SMALL
                        }}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <CustomRadioButton setGender={setSelectedGender} />
                            </View>
                        </View>
                        {/* ID Number section */}
                        <View>
                            <CustomInput
                                fontFamily={'Montserrat'}
                                color={Constants.COLORS.WHITE}
                                isSecure={false}
                                value={formData.idNumber}
                                inputValue={(text) =>
                                    setFormData((prev) => ({ ...prev, idNumber: text }))}
                                placeholderValue={'ID Number'}
                                flexValue={0}
                                keyboardTypeValue='numeric'
                                style={[createUserStyle.inputText]} />
                        </View>
                        {/* Password section */}
                        {
                            !isPasswordCompare ? <CustomMessage fontFamily={''} color={Constants.COLORS.RED} message={'Password doesn\'t match'} /> : null
                        }
                        <View>
                            <CustomInput
                                fontFamily={'Montserrat'}
                                color={Constants.COLORS.WHITE}
                                isSecure={true}
                                value={formData.password}
                                inputValue={(text) =>
                                    setFormData((prev) => ({ ...prev, password: text }))}
                                placeholderValue={'Password'}
                                flexValue={0}
                                style={[createUserStyle.inputText]} />
                        </View>
                        <View>
                            <CustomInput
                                fontFamily={'Montserrat'}
                                color={Constants.COLORS.WHITE}
                                isSecure={true}
                                value={formData.reEnterPassword}
                                inputValue={(text) =>
                                    setFormData((prev) => ({ ...prev, reEnterPassword: text }))}
                                placeholderValue={'Re-enter Password'}
                                flexValue={0}
                                style={[createUserStyle.inputText]} />
                        </View>

                    </View>
                </ScrollView>

                {/* Footer */}
                <View style={createUserStyle.footer}>
                    <TouchableOpacity onPress={submit}>
                        <Text style={createUserStyle.signupBtn}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>

    )
}