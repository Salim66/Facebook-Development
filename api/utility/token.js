import jwt from 'jsonwebtoken';

/**
 * Create a new token
 */
export const createToken = ( payload, exp ) => {

    const token = jwt.sign( payload, process.env.JWT_SECRET, {
        expiresIn: exp
    } )

    return token;

}

/**
 * Account verify token
 */
export const  tokenVerify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
