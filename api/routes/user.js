import express from 'express';
import { loggedInUser, login, register } from '../controllers/userController.js';



// init router
const router = express.Router();


// Auth Route
router.post('/login', login);
router.post('/register', register);
router.get('/me', loggedInUser);


// Export default router
export default router;