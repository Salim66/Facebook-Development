/**
 * Email Validate
 */
export const isEmail = (auth) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(auth);
}

/**
 * Mobile Validate
 */
export const isMobile = (auth) => {
    return /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(auth);
}

/**
 * Number Validate
 */
export const isNumber = (data) => {
    return /^\d*(\.\d+)?$/.test(data);
}

/**
 * String Validate
 */
export const isString = (data) => {
    return /^([a-z0-9]{5,})$/.test(data);
}