import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, StyleSheet, Easing, TouchableOpacity } from 'react-native';
import { Constants } from '../constants/constants'; // update path as needed
import CustomText from './CustomText';

export default function WaitBooking({ onPress }) {
    const [seconds, setSeconds] = useState(0);
    const rotateAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 700,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval); // cleanup when unmount
    }, []);

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const sec = secs % 60;
        return `${String(minutes).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <CustomText style={styles.text}>Waiting For Driver...</CustomText>
                {/* <Animated.View style={[{ transform: [{ rotate }] }]}>
                    <Image
                        source={require('../assets/img/tricycle.png')} // put your image in assets folder
                        style={{ width: 200, height: 100, transform: [{ scaleX: -1 }] }} // adjust size & spacing
                        resizeMode="contain"
                    />
                </Animated.View> */}
                <CustomText style={styles.timer}>{formatTime(seconds)}</CustomText>
            </View>

            <TouchableOpacity onPress={onPress} style={styles.cancelBtn}>
                <CustomText style={styles.cancelBtnTxt}>Cancel Book</CustomText>
            </TouchableOpacity>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: Constants.COLORS.BLUE,
        zIndex: 10
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Montserrat',
        color: Constants.COLORS.WHITE,
        fontSize: Constants.SIZE.HEADINGS
    },
    cancelBtn: {
        backgroundColor: Constants.COLORS.RED,
        padding: Constants.PADDING.SMALL
    },
    cancelBtnTxt: {
        color: Constants.COLORS.WHITE,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    },
    timer: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.MEDIUM,
        color: Constants.COLORS.WHITE
    }
});