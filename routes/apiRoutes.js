import { Constants } from "../constants/constants";
const mainRoute = Constants.API_ROUTE.API_ENDPOINT;

const apiRoutes = {
    loginRoute: mainRoute.concat("/api/commuter/login-commuter"),
    getHistoryRoute: mainRoute.concat("/api/commuter/gethistory"),
    createUser: mainRoute.concat("/api/commuter/createuser-commuter"),

    getProfile: mainRoute.concat("/api/commuter/getProfile"),
    updateProfile: mainRoute.concat("/api/commuter/updateProfile"),
    getNewsFare: mainRoute.concat("/api/commuter/getNewsFare"),

    createRating: mainRoute.concat("/api/commuter/createRating"),
    createBooking: mainRoute.concat("/api/commuter/createBooking"),
    cancelBooking: mainRoute.concat("/api/commuter/cancelBooking"),
    acceptBooking: mainRoute.concat("/api/commuter/acceptBooking"),
    getBaseFare: mainRoute.concat("/api/commuter/getBaseFare")
}

export { apiRoutes };