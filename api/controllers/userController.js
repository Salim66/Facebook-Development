import User from '../models/User.js';
import createError from '../utility/createError.js';
import { hashPassword, passwordVerify } from '../utility/hash.js';
import { getRandom } from '../utility/math.js';
import { sendActivationLink, sendForgotPasswordLink } from '../utility/sendMail.js';
import sendSMS from '../utility/sendSMS.js';
import { createToken, tokenVerify } from '../utility/token.js';
import { isEmail, isMobile } from '../utility/validate.js';


/**
 * @access public
 * @route api/v1/user/register 
 * @method POST
 */
export const register = async (req, res, next) => {
    
    try {

        // get form data
        const { first_name, sur_name, auth, password, birth_date, birth_month, birth_year, gender } = req.body;
        
        // validation
        if( !first_name || !sur_name || !auth || !password || !gender ){
            next(createError(400, 'All fields are required !'));
        }

        let emailData = null;
        let mobileData = null;

        if(isEmail(auth) ){
            emailData = auth;
            let emailCheck = await User.findOne({ email: auth });
            if(emailCheck){
                return next(createError(400, 'Email is already exists !'));
            }
        }else if(isMobile(auth) ){
            mobileData = auth;
            let mobileCheck = await User.findOne({ mobile: auth });
            if(mobileCheck){
                return next(createError(400, 'Mobile is already exists !'));
            }
        }else {
            return next(createError(400, 'Invalid Email or Mobile !'));
        }

        // create random number
        let activationCode = getRandom(10000, 99999);

        // check activation code is match other user 
        let checkCode = await User.findOne({ access_token: activationCode });

        if( checkCode ){
            activationCode = getRandom(10000, 99999);
        }

        // Create User
        const user = await User.create({
            first_name, 
            sur_name,
            email: emailData, 
            mobile: mobileData, 
            password: hashPassword(password), 
            birth_date, 
            birth_month, 
            birth_year, 
            gender,
            access_token: activationCode
        });

        
        if( user ){

            if(emailData){
                // create a activation token
                const activationToken = createToken({ id: user._id }, '30d');

                await sendActivationLink(user.email, {
                    name: user.first_name +" "+ user.sur_name,
                    link : `${process.env.APP_URL +':'+ process.env.PORT}/api/v1/user/activate/${activationToken}`,
                    code: activationCode
                })

                res.status(201).cookie('otp', user.email, { expires: new Date(Date.now() + 1000*60*15)}).json({
                    message : "User created successful :)",
                    user : user
                });
            }

            if(mobileData){
                // create a activation OTP
                sendSMS(user.mobile, `Hi ${user.first_name} ${user.sur_name}, your account activation OTP is ${ activationCode }`)
                

                res.status(201).cookie('otp', user.mobile, { expires: new Date(Date.now() + 1000*60*15)}).json({
                    message : "User created successful :)",
                    user : user
                });
            }

        }

    } catch (error) {
        next(error);
    }

} 



/**
 * @access public
 * @route api/v1/user/resend-code-activate 
 * @method POST
 */
export const activateCodeResend = async (req, res, next) => {
    
    try {

        const { auth } = req.body;

        let emailData = null;
        let mobileData = null;
        let emailCheck; 
        let mobileCheck;


        if(isEmail(auth) ){
            emailData = auth;
            emailCheck = await User.findOne({ email: auth });
            if(!emailCheck){
                return next(createError(400, 'Email user account not found !'));
            }

            if(emailCheck.isActivate){
                return next(createError(400, 'Email user account is already activate !'));
            }
        }else if(isMobile(auth) ){
            mobileData = auth;
            mobileCheck = await User.findOne({ mobile: auth });
            if(!mobileCheck){
                return next(createError(400, 'Mobile user account not found !'));
            }

            if(mobileCheck.isActivate){
                return next(createError(400, 'Mobile user account is already activate !'));
            }
        }else {
            return next(createError(400, 'Invalid Email or Mobile !'));
        }

        // create random number
        let activationCode = getRandom(10000, 99999);

        // check activation code is match other user 
        let checkCode = await User.findOne({ access_token: activationCode });

        if( checkCode ){
            activationCode = getRandom(10000, 99999);
        }

        if( emailData ) {

            await User.findByIdAndUpdate(emailCheck._id, { 
                access_token: activationCode
            })

            // create a activation token
            const activationToken = createToken({ id: emailCheck._id }, '30d');

            sendActivationLink(emailCheck.email, {
                 name: emailCheck.first_name +" "+ emailCheck.sur_name,
                 link : `${process.env.APP_URL +':'+ process.env.PORT}/api/v1/user/activate/${activationToken}`,
                 code: activationCode
            })
 
            res.status(201).cookie('otp', emailCheck.email, { expires: new Date(Date.now() + 1000*60*15)}).json({
                 message : "Resend link has been send :)",
             });
        }

        if(mobileData){
            // create a activation OTP
            sendSMS(mobileCheck.mobile, `Hi ${mobileCheck.first_name} ${mobileCheck.sur_name}, your account activation OTP is ${ activationCode }`)
            

            res.status(201).cookie('otp', mobileCheck.mobile, { expires: new Date(Date.now() + 1000*60*15)}).json({
                message : "Resend link has been send :)",
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
    
    try {
        
        const auth_token = req.headers.authorization;
        
        if( !auth_token ) {
            next(createError(400, 'Token not found!'));
        }

        if( auth_token ) {

            const token = auth_token.split(' ')[1];
            const user = tokenVerify(token);

            if( !user ) {
                next(createError(400, 'Invalid Token!'));
            }else {

                const loggedInUser = await User.findById(user.id);

                if( !loggedInUser ){
                    next(createError(400, 'User data not match'));
                }else {

                    res.status(200).json({
                        message: "User data stable",
                        user: loggedInUser
                    });

                }

            }

        }

    } catch (error) {
       next(error); 
    }

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
                        isActivate: true,
                        access_token: ""
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

/**
 * @access private
 * @routes /api/v1/user/code-activate
 * @method POST
 */
export const activateAccountByCode = async (req, res, next) => {

    try {
        
        const { code, auth } = req.body;

        // find user by activate code and isActivate is false
        let user = await User.findOne().or([{ email: auth }, { mobile: auth }]);


        if( !user ) {
            return next(createError(404, 'Activation user not found!'));
        }else {

            if( user.isActivate == true ){
                return next(createError(404, 'Your account is already activate!'));
            }else {

                if( user.access_token != code ){
                    return next(createError(404, 'OTP code is not match!'));
                }else {
                    await User.findByIdAndUpdate( user._id, {
                        isActivate: true,
                        access_token: ''
                    });
        
                    res.status(200).json({
                        message: "User account activation successful"
                    })
                }

            }

        }

    } catch (error) {
        next(error);
    }

}

/**
 * @access public
 * @routes /api/v1/user/forgot-password
 */
export const forgotPassword = async (req, res, next) => {

    try {
        
        // get email
        const { email } = req.body;
        
        // find user by email
        const user = await User.findOne({ email: email });

        if( !user ) {
            next(createError(400, "User not found, this email!"));
        }

        if( user ) {

            // create random number
            let resetCode = getRandom(10000, 99999);

            // check reset code is match other user 
            let checkCode = await User.findOne({ access_token: resetCode });

            if( checkCode ){
                resetCode = getRandom(10000, 99999);
            }


            // create a password reset token
            const activationToken = createToken({ id: user._id }, '30d');

            sendForgotPasswordLink(user.email, {
                name: user.first_name +" "+ user.sur_name,
                link : `${process.env.APP_URL +':'+ process.env.PORT}/api/v1/user/forgot-password/${activationToken}`,
                code: resetCode
            })

            res.status(201).json({
                message : "A password reset link has sent to your email"
            })

        }

    } catch (error) {
        next(error);
    }

}


/**
 * @access private
 * @route /api/v1/user/forgot-password/:token
 * @method POST 
 */
 export const resetPasswordAction = async (req, res, next) => {

    try {
        
        // get token
        let { token } = req.params;
        // get body data
        let { password } = req.body;

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

                if( !user ){
                    next(createError(400, 'User not found!'));
                }else {
                    await User.findByIdAndUpdate( user._id, {
                        password: hashPassword(password),
                        access_token: ""
                    } );
    
                    res.status(200).json({
                        message: "Changed password successful"
                    });
                }                

            }

        }

    } catch (error) {
        next(error);
    }

}
