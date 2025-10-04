import { apiRoutes } from "../routes/apiRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginTest = async (username, password) => { //test login
    try {
        const res = await fetch(apiRoutes.loginRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        return await res.json();
    } catch (err) {
        console.log('ERR');
    }
}


export const getHistory = async () => { //test login
    try {
        const res = await fetch(apiRoutes.getHistoryRoute, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

export const createUser = async (formData) => { //test login
    try {
        const res = await fetch(apiRoutes.createUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
}
//Profile Page
export const fetchUserProfile = async () => {
    try {
        const res = await fetch(apiRoutes.getProfile, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await res.json();
    } catch (err) {
        console.error('Error fetching profile:', err);
    }
};

export const updateUserProfile = async (firstName, lastName, email, address, contactNumber, license, selectedGender) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const res = await fetch(apiRoutes.updateProfile, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                contact: contactNumber,
                email,
                address,
                contact_number: contactNumber,
                id_number: license,
                gender: selectedGender,
            }),
        });

        return await res.json();

    } catch (err) {
        console.error('Error fetching profile:', err);
    }
};

//News Fare Page
export const fetchNewsFare = async (sortOrder, dateFilter) => {
    try {
        const res = await fetch(apiRoutes.getNewsFare, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sort: sortOrder,     // e.g., 'Latest' or 'Oldest'
                date: dateFilter,    // e.g., 'Last 24h' or 'This Year'
            }),
        });

        return await res.json();
    } catch (err) {
        console.error('Error fetching news fare:', err);
    }
};


export const createAppRating = async (experience, rating, suggestion) => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log(token)
        const res = await fetch(apiRoutes.createRating, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                experience,
                rating,
                suggestion,
            }),
        });

        return await res.json();

    } catch (err) {
        console.log('Error encountered:', err);
    }
};

export const createBooking = async (fare, location_from, location_to, distance, rate, category, coordinates_to_lat, coordinates_to_long, coordinates_from_lat, coordinates_from_long) => {
    try {
        console.log({
            data: {
                fare,
                location_from,
                location_to,
                distance,
                rate,
                category,
                coordinates_to_lat,
                coordinates_to_long,
                coordinates_from_lat,
                coordinates_from_long
            }
        })
        const token = await AsyncStorage.getItem('token');
        console.log(token)
        const res = await fetch(apiRoutes.createBooking, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fare,
                location_from,
                location_to,
                distance,
                rate,
                category,
                coordinates_to_lat,
                coordinates_to_long,
                coordinates_from_lat,
                coordinates_from_long
            }),
        });

        return await res.json();

    } catch (err) {
        console.log('Error encountered:', err);
    }
};

export const cancelBooking = async (bookId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log("ID Book: ",bookId)
        const res = await fetch(apiRoutes.cancelBooking, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookId
            }),
        });

        return await res.json();

    } catch (err) {
        console.log('Error encountered:', err);
    }
    
};

export const acceptBooking = async (bookId, driverId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log("ID Book: ",bookId)
        const res = await fetch(apiRoutes.acceptBooking, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookId,
                driverId
            }),
        });

        return await res.json();

    } catch (err) {
        console.log('Error encountered:', err);
    }
    
};

export const getBaseFare = async () => {
    try {
        const token = await AsyncStorage.getItem('token'); 
        const res = await fetch(apiRoutes.getBaseFare, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return await res.json();

    } catch (err) {
        console.log('Error encountered:', err);
    }
    
};



