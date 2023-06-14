const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const User = require('../model/user');
const upload = require('../middleware/upload');
const { Readable } = require('stream');
const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
	region: process.env.S3_region,
	credentials: {
		accessKeyId: process.env.S3_accessKeyId,
		secretAccessKey: process.env.S3_secretAccessKey,
	},
});

// Create post
router.post('/create', upload.single('imgSrc'), async (req, res) => {
	try {
		const { content, authorId } = req.body;

		if (!content || !authorId) {
			res.status(400).send('Content and author are required');
			return;
		}

		const user = await User.findOne({ email: authorId });

		if (!user) {
			res.status(400).send('Invalid author email');
			return;
		}

		let imgSrc = null;

		if (req.file) {
			const fileStream = Readable.from(req.file.buffer);

			// Upload the file to S3
			const s3Params = {
				Bucket: process.env.S3_bucketName,
				Key: `${Date.now()}-${req.file.originalname}`,
				Body: fileStream,
			};

			const s3UploadResponse = await s3Client.upload(s3Params).promise();
			imgSrc = s3UploadResponse.Location;
		}

		const post = await Post.create({
			content,
			author: user._id,
			imgSrc,
		});

		user.posts.push(post._id);
		await user.save();

		res.status(201).json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

// Fetch posts by user handle
router.get('/:userHandle', async (req, res) => {
	try {
		const userHandle = req.params.userHandle;
		const user = await User.findOne({ userHandle });

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		const posts = await Post.find({ author: user._id }).populate('author');
		res.status(200).json(posts);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

// Fetch post by Id
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

// Delete post by Id
router.delete('/:postId', async (req, res) => {
	try {
		const postId = req.params.postId;
		const post = await Post.deleteOne({ _id: postId });

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
