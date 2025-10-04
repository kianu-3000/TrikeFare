import { Constants } from "../constants/constants";
const mainRoute = Constants.API_ROUTE.API_ENDPOINT;

const apiRoutes = {
    loginRoute: mainRoute.concat("/commuter/login-commuter"),
    getHistoryRoute: mainRoute.concat("/commuter/gethistory"),
    createUser: mainRoute.concat("/commuter/createuser-commuter"),

    getProfile: mainRoute.concat("/commuter/getProfile"),
    updateProfile: mainRoute.concat("/commuter/updateProfile"),
    getNewsFare: mainRoute.concat("/commuter/getNewsFare"),

    createRating: mainRoute.concat("/commuter/createRating"),
    createBooking: mainRoute.concat("/commuter/createBooking"),
    cancelBooking: mainRoute.concat("/commuter/cancelBooking"),
    acceptBooking: mainRoute.concat("/commuter/acceptBooking"),
    getBaseFare: mainRoute.concat("/commuter/getBaseFare")
}

export { apiRoutes };