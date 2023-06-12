const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const Post = require('../model/post');
const User = require('../model/user');

// Create post
router.post('/create', upload.none(), async (req, res) => {
	try {
		const { content, authorId, imgSrc } = req.body;

		if (!content || !authorId) {
			res.status(400).send('Content and author are required');
		} else {
			const user = await User.findOne({ email: authorId });

			if (!user) {
				res.status(400).send('Invalid author email');
				return;
			}

			const post = await Post.create({
				content,
				author: user._id,
				imgSrc,
			});

			res.status(201).json(post);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

// Fetch post by postId
router.get('/:postId', async (req, res) => {
	try {
		const postId = req.params.postId;
		const post = await Post.findById(postId).populate('author');

		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({
				message: 'Post not found',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

// Fetch all posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find().limit(50).populate('author');
		res.status(200).json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

module.exports = router;
