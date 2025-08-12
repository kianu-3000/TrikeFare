import axios from 'axios';
import { Constants } from '../constants/constants';
import * as Location from "expo-location";

const getRoute = async (setRouteCoords) => {
    const start = [123.972252, 10.319715]; // [lng, lat] - e.g., Manila
    const end = [123.945258, 10.340958];   // [lng, lat] - e.g., Quezon City


    const url = 'https://api.openrouteservice.org/v2/directions/driving-car';

    const body = {
        coordinates: [start, end],
    };

    try {

        const response = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
            {
                coordinates: [
                    start, // lng, lat
                    end,
                ],
            },
            {
                headers: {
                    Authorization: Constants.API_KEY.OPEN_ROUTE_SERVICE,
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = await response.data.features[0].geometry.coordinates;
        // console.log(JSON.stringify(data));

        const formattedCoords = data.map(([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
        }));
        setRouteCoords(formattedCoords);

    } catch (error) {
        console.error('ORS route error:', error);
    }
};

const getAddressFromCoords = async (lat, lng, setAddress, setIsLoading) => {
    try {
        setIsLoading(true);
        const response = await axios.get('https://api.openrouteservice.org/geocode/reverse', {
            params: {
                api_key: Constants.API_KEY.OPEN_ROUTE_SERVICE,
                'point.lon': lng, // notice it's lng,lat,
                'point.lat': lat,
                size: 1, // get only 1 result
                layers: 'venue'
            }
        });
        setIsLoading(false);

        const features = response.data.features;

        if (features.length > 0) {
            const address = features[0].properties.label;
            setAddress(address);
            // console.log("Address:", address);
            return address;
        } else {
            console.warn("No address found");
            return null;
        }
    } catch (error) {
        console.error("ORS reverse geocoding error:", error.message);
        return null;
    }
};

const goToMyLocation = async (mapRef, setRegion, setPin) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        console.log("Permission denied");
        return;
    }
    
    let location = await Location.getCurrentPositionAsync({});
    // console.log('Location: ' + JSON.stringify(location));
    mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    setPin({ latitude: location.coords.latitude, longitude: location.coords.longitude })
    
};

export { getRoute, getAddressFromCoords, goToMyLocation };