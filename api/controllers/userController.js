import User from '../models/User.js';
import createError from '../utility/createError.js';
import { hashPassword, passwordVerify } from '../utility/hash.js';
import { sendActivationLink } from '../utility/sendMail.js';
import { createToken } from '../utility/token.js';
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

            const token = createToken({ id: user._id }, '365d');
            const activationToken = createToken({ id: user._id }, '30d');

            sendActivationLink(user.email, {
                name: user.first_name +" "+ user.sur_name,
                link : ''
            })

            res.status(201).json({
                message : "User created successful :)",
                user : user,
                token : token
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
    
    try {
        
        // get form data
        const { email, password } = req.body;

        if( !email || !password ){
            next(createError(400, 'All fields are required !'));
        }

        if( !isEmail(email) ){
            next(createError(400, 'Email is Invalid !'));
        }

        const loginUser = await User.findOne({ email : email });

        if( !loginUser ){
            next(createError(400, "Email doesn't exists !"));
        }else {

            if( !passwordVerify( password, loginUser.password ) ){
                next(createError(400, "Wrong Password !"));
            }else {
                const token = createToken({ id: loginUser._id }, '365d');

                res.status(201).cookie('authToken', token).json({
                    message : "User login successful :)",
                    user : loginUser,
                    token : token
                });
            }

        }

    } catch (error) {
        next(error);
    }

} 

/**
 * @access public
 * @route api/v1/me 
 * @method GET
 */
export const loggedInUser = async (req, res, next) => {
    
    res.send('Logged In User Okey');

} 

