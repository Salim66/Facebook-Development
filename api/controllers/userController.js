import User from '../models/User.js';
import createError from '../utility/createError.js';
import { hashPassword } from '../utility/hash.js';
import { isEmail } from '../utility/validate.js';


/**
 * @access public
 * @route api/v1/register 
 * @method POST
 */
export const register = async (req, res, next) => {
    
    try {

        // get form data
        const { first_name, sur_name, email, password, birth_date, birth_month, birth_year, gender } = req.body;
        
        // validation
        if( !first_name || !sur_name || !email || !password || !gender ){
            next(createError(400, 'All fields are required !'));
        }
        if( !isEmail(email) ){
            next(createError(400, 'Email is Invalid !'));
        }

        const emailUser = await User.findOne({ email : email });

        if( emailUser ){
            next(createError(400, 'Email already exists !'));
        }

        // Create User
        const user = await User.create({
            first_name, 
            sur_name, email, 
            password: hashPassword(password), 
            birth_date, 
            birth_month, 
            birth_year, 
            gender
        });

        if( user ){
            res.status(201).json({
                "message" : "User created successful :)",
                "user": user
            });
        }

    } catch (error) {
        next(error);
    }

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

