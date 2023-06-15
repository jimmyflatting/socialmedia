import express from 'express';
const router = express.Router();
import { getUser, getUserHandle } from '../controllers/users.js';

router.get('/:userHandle', getUserHandle);
router.get('/', getUser);

/* EXPORT ROUTE */
const users = router;
export { users };
