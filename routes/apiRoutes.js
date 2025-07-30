import { Constants } from "../constants/constants";
const mainRoute = Constants.API_ROUTE.API_ENDPOINT;

const apiRoutes = {
    loginRoute: mainRoute.concat("/login"),
    getHistoryRoute: mainRoute.concat("/commuter/gethistory"),
    createUser: mainRoute.concat("/commuter/createuser"),

    getProfile: mainRoute.concat("/commuter/getProfile"),
    updateProfile: mainRoute.concat("/commuter/updateProfile"),
    getNewsFare: mainRoute.concat("/commuter/getNewsFare"),
}

export { apiRoutes };