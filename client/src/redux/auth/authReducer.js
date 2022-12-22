import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "./authActionType";
import authInitialState from "./authInitialState";


// create auth reducer
const AuthReducer = ( state = authInitialState, { type, payload } ) => {
    switch (type) {
        case REGISTER_REQUEST:
            return {
                ...state, 
                loading: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state, 
                loading: false,
                message: payload
            };
        case REGISTER_FAILED:
            return {
                ...state, 
                loading: false,
                message: payload
            };

        case LOGIN_REQUEST:
            return {
                ...state, 
                loading: false,
                loginState: true,
                user: {}
            };
        case LOGIN_SUCCESS:
            return {
                ...state, 
                loading: true,
                loginState: true,
                user: payload
            };
        case LOGIN_FAILED:
            return {
                ...state, 
                loading: false,
                loginState: true,
                user: {}
            };
    
        default:
            return state;
    }
}

// export default 
export default AuthReducer;