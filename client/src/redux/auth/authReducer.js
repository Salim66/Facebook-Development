import authInitialState from "./authInitialState";


// create auth reducer
const AuthReducer = ( state = authInitialState, { type, payload } ) => {
    switch (type) {
        case '':
            return;
    
        default:
            return state;
    }
}

// export default 
export default AuthReducer;