import { REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "./authActionType";
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
    
        default:
            return state;
    }
}

// export default 
export default AuthReducer;