import express from 'express';
import { upload } from '../middleware/upload.js';
import { checkAuth } from '../middleware/checkAuth.js';
import {
	createPost,
	fetchUserPost,
	fetchPostById,
	deletePostById,
	fetchPosts,
} from '../controllers/post.js';

const router = express.Router();

router.post('/create', checkAuth, upload.single('imgSrc'), createPost);
router.get('/:userHandle', checkAuth, fetchUserPost);
router.get('/:postId', checkAuth, fetchPostById);
router.delete('/:postId', checkAuth, deletePostById);
router.get('/', checkAuth, fetchPosts);

const post = router;

export { post };
