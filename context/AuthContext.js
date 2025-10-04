import { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getBaseFare } from '../services/service';

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mapSessionStart, setMapSessionStart] = useState(true);

    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = await AsyncStorage.getItem('token');
    //         if (token) setIsAuthenticated(true);
    //     };
    //     checkToken();
    // }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, mapSessionStart, setMapSessionStart }}>
            {children}
        </AuthContext.Provider>
    );
}

const DestinationContext = createContext();
const DestinationProvider = ({ children }) => {
    const [startLoc, setStartLoc] = useState({});
    const [destLoc, setDestLoc] = useState({});
    const [pinType, setPinType] = useState(null);
    const [distanceInKm, setDistanceInKm] = useState(null);
    const [fareRate, setFareRate] = useState(null);

    const [baseFare, setBaseFare] = useState(null);
    useEffect(() => {
        try {
            const baseFare = async () => {
                const result = await getBaseFare();
                if(result){
                    console.log(JSON.stringify(result));
                    setBaseFare(parseFloat(result.users.base_fare));
                    setFareRate(parseFloat(result.users.fare_rate));
                }
            }
            baseFare();
        } catch (error) {
            console.log("Error getting base fare: ", error);
        }
    }, [])

    return (
        <DestinationContext.Provider value={{
            startLoc,
            setStartLoc,
            destLoc,
            setDestLoc,
            pinType,
            setPinType,
            distanceInKm,
            setDistanceInKm,
            baseFare,
            setBaseFare,
            fareRate,
            setFareRate
        }}>
            {children}
        </DestinationContext.Provider>
    )
}

const useDestination = () => {
    return useContext(DestinationContext);
}


export {
    AuthContext,
    AuthProvider,
    DestinationProvider,
    DestinationContext,
    useDestination
};