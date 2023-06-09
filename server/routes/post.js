const express = require('express');
const router = express.Router();
const S3 = require('@aws-sdk/client-s3');
const Post = require('../model/post');
const mongoose = require('mongoose');

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
		});

		// return post
		res.status(201).json(post);
	} catch (err) {
		console.log(err);
	}
});

router.get('/', async (req, res) => {
	const db = mongoose.connection.db;
	let collection = await db.collection('posts');
	let results = await collection.find({}).limit(50).toArray();

	res.send(results).status(200);
});

/* EXPORT ROUTE */
module.exports = router;
