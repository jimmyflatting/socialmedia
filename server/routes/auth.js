import express from 'express';
import { login, logout, register, validate } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/logout', logout);

router.get('/validate', validate);

const auth = router;

export { auth };
