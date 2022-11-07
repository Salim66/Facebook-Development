import createError from "../controllers/errorController.js";
import jwt from 'jsonwebtoken';



// Check usee is authentiacated or not
export const userMiddleware = (req, res, next) => {

    try {
        
        const token = req.cookies.access_token;

        // check logged in token has or not
        if( !token ){
            return next(createError(401, 'You are not authenticated'));
        }

        // If logged in 
        const login_user = jwt.verify(token, process.env.JWT_SECRET);

        if( !login_user ){
            return next(createError(401, 'Invalid Token'));
        }

        if( login_user.id !== req.params.id ){
            return next(createError(401, 'You are not able to access this feature'));
        }
        
        if( login_user ){
            req.user = login_user;
            next();
        }


    } catch (error) {
        next(error);
    }

}