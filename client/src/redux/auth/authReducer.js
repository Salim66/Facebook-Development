import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, TOKEN_USER_FAILED, TOKEN_USER_REQUEST, TOKEN_USER_SUCCESS, USER_LOGOUT } from "./authActionType";
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
                loading: true,
                loginState: false,
                user: null
            };
        case LOGIN_SUCCESS:
            return {
                ...state, 
                loading: false,
                loginState: true,
                user: payload
            };
        case LOGIN_FAILED:
            return {
                ...state, 
                loading: false,
                loginState: false,
                user: null
            };

        case TOKEN_USER_REQUEST:
            return {
                ...state, 
                loading: true,
                loginState: false,
                user: null
            };
        case TOKEN_USER_SUCCESS:
            return {
                ...state, 
                loading: false,
                loginState: true,
                user: payload
            };
        case TOKEN_USER_FAILED:
            return {
                ...state, 
                loading: false,
                loginState: false,
                user: null
            };
        case USER_LOGOUT:
            return {
                ...state, 
                loading: true,
                loginState: false,
                user: null
            };
    
        default:
            return state;
    }
}

// export default 
export default AuthReducer;