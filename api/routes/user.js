import express from 'express';
import { loggedInUser, login, register, activateAccount, activateAccountByCode, forgotPassword, resetPasswordAction, activateCodeResend, findUserAccount, sendPasswordResetLink } from '../controllers/userController.js';



// init router
const router = express.Router();


// Auth Route
router.post('/login', login);
router.post('/register', register);
router.get('/me', loggedInUser);
router.get('/activate/:token', activateAccount);
router.post('/code-activate', activateAccountByCode);
router.post('/resend-code-activate', activateCodeResend);
router.post('/forgot-password', forgotPassword);
router.post('/forgot-password/:token', resetPasswordAction);
router.post('/find-user-account', findUserAccount);
router.post('/send-password-reset-link', sendPasswordResetLink);


// Export default router
export default router;