import User from '../models/User.js';


/**
 * @access public
 * @route api/v1/register 
 * @method POST
 */
export const register = async (req, res, next) => {
    
    res.send('User Register Okey');

} 

/**
 * @access public
 * @route api/v1/login 
 * @method POST
 */
export const login = async (req, res, next) => {
    
    res.send('User Login Okey');

} 

/**
 * @access public
 * @route api/v1/me 
 * @method GET
 */
export const loggedInUser = async (req, res, next) => {
    
    res.send('Logged In User Okey');

} 

