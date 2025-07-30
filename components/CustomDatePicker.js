import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, View } from 'react-native';
import { useState } from 'react';
import CustomText from './CustomText';
import { formatDate } from '../utils/utils';

const CustomDatePicker = ({ formData, setFormData, setIsCalendarShow }) => {
    const handleDate = (event, selectedDate) => {
        setIsCalendarShow(false);
        if (selectedDate) {
            const appliedDate = formatDate(selectedDate);
            console.log("Date ISO: " + appliedDate)
            setFormData((prev) => ({ ...prev, birthDate: selectedDate }));
        }
    }

    return (
        <View>
            
            <DateTimePicker
                value={formData.birthDate || new Date()}
                mode='date'
                is24Hour={false}
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                minimumDate={new Date(1900, 0, 1)}
                onChange={handleDate}
            />
        </View>
    )
}

export { CustomDatePicker }