// Create custom error controller
const createError = (status, msg) => {
    const err = new Error;
    err.status = status;
    err.message = msg;
    return err;
} 

export default createError;