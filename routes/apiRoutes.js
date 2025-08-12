import { Constants } from "../constants/constants";
const mainRoute = Constants.API_ROUTE.API_ENDPOINT;

const apiRoutes = {
    loginRoute: mainRoute.concat("/commuter/login-commuter"),
    getHistoryRoute: mainRoute.concat("/commuter/gethistory"),
    createUser: mainRoute.concat("/commuter/createuser-commuter"),

    getProfile: mainRoute.concat("/commuter/getProfile"),
    updateProfile: mainRoute.concat("/commuter/updateProfile"),
    getNewsFare: mainRoute.concat("/commuter/getNewsFare"),
}

export { apiRoutes };