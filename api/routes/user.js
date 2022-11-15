import express from 'express';
import { loggedInUser, login, register, activateAccount, activateAccountByCode } from '../controllers/userController.js';



// init router
const router = express.Router();


// Auth Route
router.post('/login', login);
router.post('/register', register);
router.get('/me', loggedInUser);
router.get('/activate/:token', activateAccount);
router.post('/code-activate', activateAccountByCode);


// Export default router
export default router;