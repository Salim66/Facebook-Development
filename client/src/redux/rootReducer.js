import { combineReducers } from "redux";
import AuthReducer from "./auth/authReducer";


// create reducer
const rootReducer = combineReducers({
    auth: AuthReducer,
    chat: ''
});

// export default
export default rootReducer;