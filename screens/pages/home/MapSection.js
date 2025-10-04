
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
import { getRoute, getAddressFromCoords } from '../../../services/mapService.js';
import * as Location from "expo-location";
import CustomLoading from '../../../components/CustomLoading.js';
import { useDestination } from '../../../context/AuthContext.js';

export function MapSection({ navigation, backRoute, isSpecialPage }) {
    const mapRef = useRef(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [region, setRegion] = useState(null);
    const [address, setAddress] = useState(region);
    const [initialLocation, setInitialLocation] = useState({
        latitude: 10.319333,
        longitude: 123.972028,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    })
    const [routeCoords, setRouteCoords] = useState([]);
    const [pin, setPin] = useState(null);
    const { startLoc, setStartLoc, destLoc, setDestLoc, pinType, baseFare } = useDestination();

    useEffect(() => { // this will initialize the map
        console.log('PinType: ' + pinType);
        const currentLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log('Location: ' + JSON.stringify(location));
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setPin({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        }
        currentLocation();

        getRoute(setRouteCoords);
        // console.log("DATA: " + JSON.stringify(routeCoords));
    }, []);

    // book Submitting
    const submitBook = (navigation) => {
        if (pinType == Constants.PIN_TYPE.PICK_UP) {
            setStartLoc({ lat: region.latitude, long: region.longitude, address: address })
            // console.log("Base Fare: ", JSON.stringify(baseFare));
            navigation.navigate(backRoute);
            console.log('Pick Up' + JSON.stringify(region));
        } else if (pinType == Constants.PIN_TYPE.DROP_OFF) {
            setDestLoc({ lat: region.latitude, long: region.longitude, address: address });
            // console.log("Base Fare: ", JSON.stringify(baseFare));
            navigation.navigate(backRoute);
            console.log('Drop Off' + JSON.stringify(region));
        }
    }

    // Component
    return (
        <View style={style.container}>
            {/* map section */}
            <View style={style.map}>
                {
                    isLoading ? <CustomLoading /> : null
                }
                <MapView style={style.map_content} initialRegion={initialLocation}
                    onPress={(event) => {
                        const { latitude, longitude } = event.nativeEvent.coordinate;
                        console.log("Lat:", latitude, "Lng:", longitude); // this is what you want
                        setPin({ latitude, longitude });
                    }}
                    showsUserLocation={true}
                    onRegionChangeComplete={(newRegion) => {
                        setRegion(newRegion); // Update state
                        const pinLat = newRegion.latitude;
                        const pinLng = newRegion.longitude;
                        getAddressFromCoords(newRegion.latitude, newRegion.longitude, setAddress, setIsLoading);
                        console.log("Pin Lat:", pinLat, "Pin Lng:", pinLng);
                    }}
                >
                    {/* {
                        routeCoords.length > 0 ?
                            <Polyline
                                coordinates={routeCoords}
                                strokeColor={Constants.COLORS.RED}
                                strokeWidth={6}
                            />
                            :
                            null
                    } */}
                    {pin && (
                        <Marker
                            coordinate={pin}
                            title="Pinned Location"
                            description={`Lat: ${pin.latitude}, Lng: ${pin.longitude}`}
                        />
                    )}

                    {/* <UrlTile
                        urlTemplate={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${Constants.API_KEY.MAP_TILER}`}
                        maximumZ={19}
                        flipY={false}
                    /> */}

                </MapView>
                <Ionicons name="pin" size={42} color={Constants.COLORS.RED} style={style.pin} />
            </View>

            {/* payment section */}
            <View style={style.payment_container}>
                <View style={style.payment}>
                    <CustomText style={style.payment_text}>Php {baseFare}</CustomText>
                </View>
            </View>

            {/* info section */}
            <View style={style.info}>
                <View style={style.info_card}>
                    <Ionicons name={'location-outline'} size={32} color={Constants.COLORS.RED} />
                    <View style={style.info_card_location}>
                        <CustomText style={{ fontFamily: 'Montserrat' }}>Pick up</CustomText>
                        <CustomText style={style.location_text}>{startLoc.address ? startLoc.address : 'Choose Location Pick Up'}</CustomText>
                    </View>
                </View>

                <View style={style.info_card}>
                    <Ionicons name={'location-outline'} size={32} color={Constants.COLORS.BLUE} />
                    <View style={style.info_card_location}>
                        <CustomText style={{ fontFamily: 'Montserrat' }}>Drop off</CustomText>
                        <CustomText style={style.location_text}>{destLoc.address ? destLoc.address : 'Choose Location Drop Off'}</CustomText>
                    </View>
                </View>
            </View>

            {/* navigation section */}
            <View style={style.navigation}>
                <CustomButton color={Constants.COLORS.RED} fontSize={Constants.SIZE.REGULAR} onPress={() => navigation.navigate(backRoute)} text={'Back'} width={'auto'} />
                {isSpecialPage ?
                    <CustomButton color={Constants.COLORS.GREEN} fontSize={Constants.SIZE.REGULAR} onPress={() => { submitBook(navigation) }} text={pinType == Constants.PIN_TYPE.PICK_UP ? 'Pick Up' : 'Drop Off'} width={'auto'} />
                    :
                    <CustomButton color={Constants.COLORS.RED} fontSize={Constants.SIZE.REGULAR} onPress={() => navigation.navigate('TaripaSection')} text={'Taripa'} width={'auto'} />}

            </View>

        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.COLORS.WHITE
    },
    map: {
        flex: 1,
        backgroundColor: Constants.COLORS.GRAYISH_WHITE,
        position: 'relative'
    },
    map_content: {
        width: '100%',
        height: '100%'
    },
    payment_container: {
        paddingTop: Constants.PADDING.REGULAR,
        paddingBottom: Constants.PADDING.REGULAR,
        paddingLeft: Constants.PADDING.LARGE,
        paddingRight: Constants.PADDING.LARGE
    },
    payment: {
        backgroundColor: Constants.COLORS.RED,
        padding: Constants.PADDING.SMALL,
        borderRadius: Constants.BORDERS.RADIUS_SMALL
    },
    payment_text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.MEDIUM,
        color: Constants.COLORS.WHITE,
        textAlign: 'center'
    },
    info: {
        flex: 0.3,
        padding: Constants.PADDING.REGULAR,
        borderTopWidth: 1,
        borderColor: Constants.COLORS.BLACK,
    },
    info_card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Constants.PADDING.SMALL
    },
    info_card_location: {
        marginLeft: Constants.MARGIN.SMALL,
        paddingRight: Constants.PADDING.REGULAR
    },
    location_text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.REGULAR
    },
    navigation: {
        paddingTop: Constants.PADDING.REGULAR,
        flexDirection: 'row',
        paddingBottom: Constants.PADDING.MEDIUM,
        justifyContent: 'space-evenly'
    },
    // location: {
    //     position: 'absolute',
    //     top: '82%',
    //     left: '88%',
    //     padding: Constants.PADDING.X_SMALL,
    //     backgroundColor: Constants.COLORS.WHITE,
    //     borderRadius: Constants.BORDERS.RADIUS_LARGE,
    //     zIndex: 100
    // }
    pin: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            { translateX: -21 }, // move left 25px
            { translateY: -40 }  // move up 50px
        ]
    }
})