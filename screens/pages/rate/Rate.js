import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
import { createAppRating } from '../../../services/service';
import CustomMessageModal from '../../../components/CustomMessageModal';
import CustomLoading from '../../../components/CustomLoading';

export default function Rating() {
    const [experience, setExperience] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [rating, setRating] = useState(0);

    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseMsg, setResponseMsg] = useState('');
    const [responseStatus, setResponseStatus] = useState('');

    const [star, setStar] = useState([
        { color: Constants.COLORS.WHITE },
        { color: Constants.COLORS.WHITE },
        { color: Constants.COLORS.WHITE },
        { color: Constants.COLORS.WHITE },
        { color: Constants.COLORS.WHITE }
    ]);

    const starColor = (index) => {
        const updatedStars = star.map((s, i) => ({
            color: i <= index ? Constants.COLORS.YELLOW : Constants.COLORS.WHITE
        }));
        setStar(updatedStars);
        setRating(index + 1); // rating is 1-based
    };

    const handleSubmit = async () => {
        if (!rating) {
            setModalVisible(true)
            setResponseMsg('Rating is required.')
            setResponseStatus(500)
            return;
        }
        if (!experience) {
            setModalVisible(true)
            setResponseMsg('Experience field is required.')
            setResponseStatus(500)
            return;
        }
        setLoading(true);
        try {

            const response = await createAppRating(experience, rating, suggestion);

            if (response?.status === 200) {
                setModalVisible(true)
                setResponseMsg(response.message)
                setResponseStatus(response.status)
                setExperience('');
                setSuggestion('');
                setRating(0);
                setStar(star.map(() => ({ color: Constants.COLORS.WHITE })));
                setLoading(false);
            } else {
                setModalVisible(true)
                setResponseMsg('Something went wrong.')
                setResponseStatus(500)
            }
        }
        catch {
            setLoading(false);
            setModalVisible(true)
            setResponseMsg('Something went wrong.')
            setResponseStatus(500)
        }
    };

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE }, globalStyle.container]}>
            {loading && <CustomLoading />}

            <CustomMessageModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                message={responseMsg}
                response={responseStatus}
            />
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
                            {star.map((icon, index) => (
                                <TouchableOpacity key={index} onPress={() => starColor(index)}>
                                    <Ionicons name={'star'} size={25} color={icon.color} style={[style.icon]} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={[style.main_card]}>
                        <CustomText style={[style.text]}>
                            How’s your experience using this app?
                        </CustomText>
                    </View>
                </View>

                <View style={[style.textAreaContainer]}>
                    <TextInput
                        placeholder="Enter your message..."
                        multiline={true}
                        numberOfLines={4}
                        style={style.textArea}
                        value={experience}
                        onChangeText={(text) => {
                            if (text.length <= 200) {
                                setExperience(text);
                            }
                        }}
                    />
                    <CustomText style={style.charCount}>
                        {experience.length}/200
                    </CustomText>
                </View>

                <View style={[style.main_card]}>
                    <CustomText style={[style.text]}>
                        What is your suggestion to improve this app?
                    </CustomText>
                </View>
                <View style={[style.textAreaContainer]}>
                    <TextInput
                        placeholder="Enter your suggestion..."
                        multiline={true}
                        numberOfLines={4}
                        style={style.textArea}
                        value={suggestion}
                        onChangeText={(text) => {
                            if (text.length <= 200) {
                                setSuggestion(text);
                            }
                        }}
                    />
                    <CustomText style={style.charCount}>
                        {suggestion.length}/200
                    </CustomText>
                </View>
            </View>

            {/* Footer Content */}
            <View style={[style.footer_container]}>
                <TouchableOpacity style={[style.button]} onPress={handleSubmit}>
                    <CustomText style={[style.text]}>
                        Submit
                    </CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        marginTop: Constants.MARGIN.REGULAR
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
        flex: 1,
        marginTop: Constants.MARGIN.SMALL,
        backgroundColor: Constants.COLORS.WHITE,
        padding: Constants.PADDING.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_SMALL
    },
    charCount: {
        textAlign: 'right',
        color: Constants.COLORS.GRAY,
        marginTop: 15,
        marginRight: 5,
        fontSize: 12,
    },
});
