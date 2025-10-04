
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Constants } from '../../../../constants/constants.js';
import CustomText from '../../../../components/CustomText.js';
import { AuthContext } from '../../../../context/AuthContext.js';
import { Ionicons } from '@expo/vector-icons';

import { CustomButton } from '../../../../components/CustomButton.js';
import { useDestination } from '../../../../context/AuthContext.js';
import MapStartSession from '../MapStartSession.js';
import { createBooking, cancelBooking } from '../../../../services/service.js';
import io from "socket.io-client";
import WaitBooking from '../../../../components/WaitBooking.js';
import { getDistanceFromCoords } from '../../../../services/mapService.js';
import CustomLoading from '../../../../components/CustomLoading.js';
import { distancePrice } from '../../../../utils/utils.js';


export default function SpecialSectionPage({ navigation }) {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [iconPickup, setIconPickup] = useState('radio-button-off');
    const [isLoading, setIsLoading] = useState(false);
    const [driverName, setDriverName] = useState(null);
    const [iconDropOff, setIconDropOff] = useState('radio-button-off');
    const [startMapSession, setStartMapSession] = useState(false);
    const [waitingDriver, setWaitingDriver] = useState(false);
    const [bookId, setBookId] = useState(null);
    const { startLoc, setStartLoc, destLoc, setDestLoc, pinType, setPinType, setDistanceInKm, distanceInKm, baseFare, fareRate } = useDestination();
    const [farePrice, setFarePrice] = useState(baseFare);

    const startSession = async () => {
        try {
            const getDistance = async () => {
                setIsLoading(true);
                const start = `${startLoc.long}, ${startLoc.lat}`;
                const end = `${destLoc.long}, ${destLoc.lat}`;
                const distanceResponse = await getDistanceFromCoords(start, end);
                // console.log("Start Loc: ", JSON.stringify(startLoc));
                // console.log("Dest Loc: ", JSON.stringify(destLoc));
                const distanceInMeters = distanceResponse.data.features[0].properties.summary;
                const distanceInKm = parseInt(distanceInMeters.distance, 10) / 1000; // this is to convert to km
                setDistanceInKm(distanceInKm);
                console.log(`Distance Response: ${distanceInKm} km`);
                return distanceInKm;

                // // const response = await createBooking(12, startLoc.address, destLoc.address, distanceInKm, 1, 'special', destLoc.lat, destLoc.long, startLoc.lat, startLoc.long);
                // setIsLoading(false);

                // setBookId(response.users.id);
                // // console.log("Booking Added! ID: ", response.users.id);
            }
            const tempDist = await getDistance();
            const fare = distancePrice(tempDist, baseFare, fareRate);
            console.log(`Distance: ${tempDist} | Base Fare: ${baseFare} | Fare Rate ${fareRate}`);
            setFarePrice(fare);
            const response = await createBooking(fare, startLoc.address, destLoc.address, tempDist, 1, 'special', destLoc.lat, destLoc.long, startLoc.lat, startLoc.long);
            setBookId(response.users.id);
            console.log("Booking Added! ID: ", response.users.id);
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }
        // setStartMapSession(true);
    }
    const socketRef = useRef(null);

    useEffect(() => {
        const setupSocket = async () => {
            const userId = await AsyncStorage.getItem('user');

            // Create the socket connection once
            socketRef.current = io('https://trikefarewebsocket.onrender.com', {
                transports: ['websocket', 'polling'],
            });

            // Join user-specific room
            socketRef.current.emit('join', userId);

            // Listen for events
            socketRef.current.on('booking_waiting', (data) => {
                // console.log('Booking Waiting!', data);
                console.log("Booking ID: ", data);
                setStartMapSession(false);
                setWaitingDriver(true);
            });
            socketRef.current.on('booking_accepted', (data) => {
                console.log('booking_accepted', data);
                setDriverName(data.book_id.driverid);
                setStartMapSession(true);
                setWaitingDriver(false);
            });

            socketRef.current.on('booking_canceled', (data) => {
                console.log('booking_canceled', data);
            });
        };

        setupSocket();

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.off('booking_waiting');
                socketRef.current.off('booking_accepted');
                socketRef.current.off('booking_canceled');
                socketRef.current.disconnect();
            }
        };
    }, []);

    // cancel booking
    const cancelBook = async () => {
        setIsLoading(true);
        const cancelledBook = await cancelBooking(bookId);
        console.log("Cancellation: ", cancelledBook);
        setIsLoading(false);
        setWaitingDriver(false);
        setStartMapSession(false);
    }
    return (

        <View style={{ flex: 1, position: 'relative' }}>
            {
                startMapSession ? <MapStartSession startLoc={startLoc} destLoc={destLoc} driverName={driverName} distance={distanceInKm} price={farePrice} onPress={cancelBook} /> : null
            }
            {
                waitingDriver ? <WaitBooking onPress={cancelBook} /> : null
            }
            {
                isLoading ? <CustomLoading /> : null
            }
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                setPinType(Constants.PIN_TYPE.PICK_UP);
                navigation.navigate('MapSection');
            }
            }>
                <View style={style.card}>
                    <View style={style.card_right}>
                        <Ionicons name={iconPickup} size={24} color={Constants.COLORS.RED} />
                    </View>
                    <View style={style.card_left}>
                        <CustomText>Pick Up</CustomText>
                        <CustomText style={style.card_left_text}>{startLoc.address ? startLoc.address : 'Search Pickup Location'}</CustomText>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                setPinType(Constants.PIN_TYPE.DROP_OFF);
                navigation.navigate('MapSection');
            }
            }>
                <View style={style.card}>
                    <View style={style.card_right}>
                        <Ionicons name={iconDropOff} size={24} color={Constants.COLORS.BLUE} />
                    </View>
                    <View style={style.card_left}>
                        <CustomText>Drop-Off</CustomText>
                        <CustomText style={style.card_left_text}>{destLoc.address ? destLoc.address : 'Search Drop-off Location'}</CustomText>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={[style.card, style.cardPrice]}>
                <View style={style.card_left}>
                    <CustomText>Fare Price:</CustomText>
                    <CustomText style={style.card_left_text}>{farePrice ? farePrice : null}</CustomText>
                </View>
            </View>

            {
                startLoc.address && destLoc.address ? (<TouchableOpacity activeOpacity={0.8} onPress={startSession}>
                    <View style={style.submitButton}>
                        <CustomText style={style.submitButtonText}>Submit</CustomText>
                    </View>
                </TouchableOpacity>)
                    :
                    null
            }

        </View>
    )
}

const style = StyleSheet.create({
    card: {
        backgroundColor: Constants.COLORS.WHITE,
        elevation: 5,
        padding: Constants.PADDING.REGULAR,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Constants.MARGIN.REGULAR,
        marginRight: Constants.MARGIN.REGULAR,
        marginTop: Constants.MARGIN.REGULAR
    },
    submitButton: {
        backgroundColor: Constants.COLORS.GREEN,
        elevation: 5,
        padding: Constants.PADDING.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_SMALL,
        marginLeft: Constants.MARGIN.LARGE,
        marginRight: Constants.MARGIN.LARGE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Constants.MARGIN.SMALL,
        marginTop: Constants.MARGIN.REGULAR,
    },
    card_right: {
    },
    card_left: {
        marginLeft: Constants.MARGIN.SMALL
    },
    card_left_text: {
        fontFamily: 'Montserrat-Bold',
        paddingRight: Constants.PADDING.REGULAR,
    },
    submitButtonText: {
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        color: Constants.COLORS.WHITE
    }
})