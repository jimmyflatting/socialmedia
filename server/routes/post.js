const express = require('express');
const S3 = require('@aws-sdk/client-s3');
const router = express.Router();
const Post = require('../model/post');

// Create post
router.post('/create', async (req, res) => {
	try {
		// get user input
		const { content, author, imgSrc } = req.body;

		// validate user input
		if (!(content === '')) {
			res.status(400).send('All input is required');
		}

		// Upload imgSrc to S3
		const S3Func = () => {
			const imgSrcS3 = '';
			return imgSrcS3;
		};

		// create post
		const post = await Post.create({
			content,
			imgSrcS3,
			author,
		});

		// return new user
		res.status(201).json(post);
	} catch (err) {
		console.log(err);
	}
});

/* EXPORT POSTS ROUTES */
module.exports = router;
