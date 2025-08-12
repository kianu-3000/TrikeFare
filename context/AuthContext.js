import { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = await AsyncStorage.getItem('token');
    //         if (token) setIsAuthenticated(true);
    //     };
    //     checkToken();
    // }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

const DestinationContext = createContext();
const DestinationProvider = ({ children }) => {
    const [startLoc, setStartLoc] = useState({});
    const [destLoc, setDestLoc] = useState({});
    const [pinType, setPinType] = useState(null);

    return (
        <DestinationContext.Provider value={{ startLoc, setStartLoc, destLoc, setDestLoc, pinType, setPinType }}>
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