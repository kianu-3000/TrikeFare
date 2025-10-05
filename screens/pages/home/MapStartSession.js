import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Constants } from '../../../constants/constants.js';
import CustomText from '../../../components/CustomText.js';
import { AuthContext } from '../../../context/AuthContext.js';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { CustomButton } from '../../../components/CustomButton.js';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, UrlTile } from 'react-native-maps';
import polyline from '@mapbox/polyline';
import axios from 'axios';
import { getRoute2, getAddressFromCoords } from '../../../services/mapService.js';
import * as Location from "expo-location";
import CustomLoading from '../../../components/CustomLoading.js';
import { useDestination } from '../../../context/AuthContext.js';


export default function MapStartSession({ navigation, startLoc, destLoc, driverName, distance, price, onPress, isDriverStarted }) {
    const [routeCoords, setRouteCoords] = useState([]);
    const [message, setMessage] = useState(true);
    const [pinStart, setPinStart] = useState(null);
    const [pinEnd, setPinEnd] = useState(null);
    const [pin, setPin] = useState(null);
    const [initialLocation, setInitialLocation] = useState({
        latitude: 10.319333,
        longitude: 123.972028,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })
    console.log({
        start: JSON.stringify(startLoc),
        end: JSON.stringify(destLoc)
    })
    useEffect(() => {
        // const currentLocation = async () => {
        //     let { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== "granted") {
        //         console.log("Permission denied");
        //         return;
        //     }
        // }
        // currentLocation();
        getRoute2(setRouteCoords, startLoc, destLoc);
        setPinStart({ latitude: startLoc.lat, longitude: startLoc.long });
        setPinEnd({ latitude: startLoc.lat, longitude: startLoc.long });
        console.log("We Are here!!!!!!!!: ", JSON.stringify(routeCoords));
        setTimeout(() => {
            setMessage(false);
        }, 4000);

    }, []);
    return (
        <View style={style.container}>
            {
                message ? <View style={style.message}><CustomText style={style.messageText}>Accepted By: {driverName}</CustomText></View> : null
            }
            <MapView style={style.map_content} initialRegion={initialLocation} showsUserLocation={true} provider={PROVIDER_GOOGLE}>
                {
                    routeCoords.length > 0 ?
                        <Polyline
                            coordinates={routeCoords}
                            strokeColor={Constants.COLORS.RED}
                            strokeWidth={6}
                        />
                        :
                        null
                }
                {
                    startLoc.lat ? (
                        <Marker
                            coordinate={{ latitude: startLoc.lat, longitude: startLoc.long }}
                            title="Starting Point"
                            description={`Lat: ${startLoc.lat}, Lng: ${startLoc.long}`}
                            pinColor="red"
                        />
                    )
                        :
                        null
                }
                {
                    destLoc.lat ? (
                        <Marker
                            coordinate={{ latitude: destLoc.lat, longitude: destLoc.long }}
                            title="Destination Point"
                            description={`Lat: ${destLoc.lat}, Lng: ${destLoc.long}`}
                            pinColor="blue"
                        />
                    )
                        :
                        null
                }
            </MapView>
            
                <ScrollView style={style.description}>
                    <CustomText style={[style.pinText, { color: Constants.COLORS.GREEN }]}>Driver:
                        <CustomText style={{ color: Constants.COLORS.BLACK }}> {driverName} </CustomText>
                    </CustomText>
                    <CustomText style={[style.pinText, { color: Constants.COLORS.RED }]}>From:
                        <CustomText style={{ color: Constants.COLORS.BLACK }}> {startLoc.address} </CustomText>
                    </CustomText>
                    <CustomText style={[style.pinText2, { color: Constants.COLORS.BLUE }]}>To:
                        <CustomText style={{ color: Constants.COLORS.BLACK }}> {destLoc.address} </CustomText>
                    </CustomText>

                    <CustomText style={[style.pinText2, { color: Constants.COLORS.YELLOW }]}>Distance:
                        <CustomText style={{ color: Constants.COLORS.BLACK }}> {distance} km </CustomText>
                    </CustomText>
                    <CustomText style={[style.pinText2, { color: Constants.COLORS.BLACK }]}>Price:
                        <CustomText style={{ color: Constants.COLORS.BLACK }}> Php {price} </CustomText>
                    </CustomText>
                    {
                        isDriverStarted ? (
                            <TouchableOpacity style={style.cancelBtn} onPress={onPress}>
                                <CustomText style={style.cancelBtnText}> Cancel </CustomText>
                            </TouchableOpacity>
                        )
                            :
                            null
                    }

                </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        zIndex: 10000,
    },
    description: {
        flex: 0,
        padding: Constants.PADDING.REGULAR,
        paddingBottom: Constants.PADDING.LARGE,
        backgroundColor: Constants.COLORS.WHITE,
        elevation: 20
    },
    map_content: {
        // flex: 1,
        height: 300
    },
    pinText: {
        fontFamily: 'Montserrat-Bold',
        padding: Constants.PADDING.SMALL,
        borderWidth: 1,
        borderColor: Constants.COLORS.RED
    },
    pinText2: {
        fontFamily: 'Montserrat-Bold',
        padding: Constants.PADDING.SMALL,
        borderWidth: 1,
        borderColor: Constants.COLORS.RED
    },
    cancelBtn: {
        backgroundColor: Constants.COLORS.RED,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.BORDERS.RADIUS_NORMAL,
        marginTop: Constants.MARGIN.REGULAR,
        marginBottom: Constants.MARGIN.LARGE
    },
    cancelBtnText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.MEDIUM,
        textAlign: 'center',
        color: Constants.COLORS.WHITE
    },
    message: {
        backgroundColor: Constants.COLORS.GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Constants.PADDING.SMALL
    },
    messageText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.REGULAR,
        textAlign: 'center',
        color: Constants.COLORS.WHITE
    }
})