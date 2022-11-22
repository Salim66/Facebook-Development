// initail State
const initailState = {
    msg: '',
    type: 'error'
}

// create toast reducer 
const toastReducer = ( state = initailState, { type, payload } ) => {
    switch (type) {
        case "":
            break;
    
        default:
            return state;
    }
}

// export default 
export default toastReducer;