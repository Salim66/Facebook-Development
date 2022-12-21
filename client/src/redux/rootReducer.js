import { combineReducers } from "redux";
import AuthReducer from "./auth/authReducer";
import toastReducer from "./toast/toastReducer";
import LoaderReducer from "./top-loader/loaderReducer";


// create reducer
const rootReducer = combineReducers({
    auth: AuthReducer,
    toast: toastReducer,
    loader: LoaderReducer,
});

// export default
export default rootReducer;