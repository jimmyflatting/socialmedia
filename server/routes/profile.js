import express from 'express';
const router = express.Router();
import { upload } from '../middleware/upload.js';
import { handleFriend, updateProfile } from '../controllers/profile.js';

// Add & Remove friends
router.put('/friends/:userHandle', handleFriend);
// Update user profile
router.put('/:userHandle', upload.single('profileImage'), updateProfile);

/* EXPORT ROUTE */
const profile = router;

export { profile };
