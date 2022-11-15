import User from '../models/User.js';
import createError from '../utility/createError.js';
import { hashPassword, passwordVerify } from '../utility/hash.js';
import { getRandom } from '../utility/math.js';
import { sendActivationLink } from '../utility/sendMail.js';
import { createToken, tokenVerify } from '../utility/token.js';
import { isEmail } from '../utility/validate.js';


/**
 * @access public
 * @route api/v1/user/register 
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

        // create random number
        let activationCode = getRandom(10000, 99999);

        // Create User
        const user = await User.create({
            first_name, 
            sur_name, email, 
            password: hashPassword(password), 
            birth_date, 
            birth_month, 
            birth_year, 
            gender,
            access_token: activationCode
        });

        
        if( user ){

            // create a activation token
            const activationToken = createToken({ id: user._id }, '30d');

            sendActivationLink(user.email, {
                name: user.first_name +" "+ user.sur_name,
                link : `${process.env.APP_URL +':'+ process.env.PORT}/api/v1/user/activate/${activationToken}`,
                code: activationCode
            })

            res.status(201).json({
                message : "User created successful :)",
                user : user
            });
        }

    } catch (error) {
        next(error);
    }

} 

/**
 * @access public
 * @route api/v1/user/login 
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
 * @route api/v1/user/me 
 * @method GET
 */
export const loggedInUser = async (req, res, next) => {
    
    res.send('Logged In User Okey');

} 

/**
 * @access private
 * @route /api/v1/user/activate/:token
 * @method GET 
 */
export const activateAccount = async (req, res, next) => {

    try {
        
        // get token
        let { token } = req.params;

        if( !token ) {
            next(createError(400, 'Invalid activation url!'));
        }else {

            // verify token
            const tokenData = tokenVerify(token);

            if( !tokenData ) {
                next(createError(400, 'Invalid Token'));
            }
            
            if( tokenData ){

                // get current register user 
                const user = await User.findById( tokenData.id );

                if( user.isActivate == true ){
                    next(createError(400, 'Account already activate!'));
                }else {
                    await User.findByIdAndUpdate( tokenData.id, {
                        isActivate: true
                    } );
    
                    res.status(200).json({
                        message: "Account activate successful"
                    });
                }                

            }

        }

    } catch (error) {
        next(error);
    }

}
