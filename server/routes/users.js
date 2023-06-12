const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
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

// Update user profile
router.put(
	'/profile/update/:author',
	upload.single('profileImage'),
	async (req, res) => {
		try {
			const userHandle = req.params.author;

			// Retrieve the updated user data from the request body
			const {
				firstName,
				lastName,
				email,
				userHandle: newHandle,
				password,
				location,
				workplace,
			} = req.body;

			// Find the user in the database based on the userHandle
			const user = await User.findOne({ userHandle: userHandle });

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			// Update the user's profile fields individually if they are provided
			if (firstName) {
				user.firstName = firstName;
			}
			if (lastName) {
				user.lastName = lastName;
			}
			if (email) {
				user.email = email;
			}
			if (newHandle) {
				user.userHandle = newHandle;
			}
			if (password) {
				user.password = password;
			}
			if (location) {
				user.location = location;
			}
			if (workplace) {
				user.workplace = workplace;
			}

			// Check if a file is uploaded
			if (req.file) {
				const fileStream = Readable.from(req.file.buffer);

				// Upload the file to S3
				const s3Params = {
					Bucket: process.env.S3_bucketName,
					Key: `${Date.now()}-${req.file.originalname}`,
					Body: fileStream,
				};

				const s3UploadResponse = await s3Client
					.upload(s3Params)
					.promise();
				const imageUrl = s3UploadResponse.Location;

				// Update the user's profile image
				user.profileImg = imageUrl;
			}

			// Save the updated user
			await user.save();

			res.status(200).json({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userHandle: user.userHandle,
				profileImg: user.profileImg,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Server error', error: error });
		}
	}
);

router.get('/profile/:author', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const userHandle = req.params.author;
		let collection = db.collection('users');
		const user = await collection.findOne({ userHandle: userHandle });

		console.log(user);

		if (user) {
			res.status(200).json({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userHandle: user.userHandle,
				posts: user.posts,
			});
		} else {
			res.status(404).json({
				message: 'User not found',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

router.get('/profile', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const email = req.headers.profile;
		let collection = db.collection('users');
		const user = await collection.findOne({
			email: email,
		});

		if (user) {
			res.status(200).json({
				profileImg: user.profileImg,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userHandle: user.userHandle,
				location: user.location,
				workplace: user.workplace,
			});
		} else {
			res.status(404).json({ message: 'User not found', email: email });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

router.get('/', async (req, res) => {
	const db = mongoose.connection.db;
	let collection = await db.collection('users');
	let results = await collection.find({}).limit(50).toArray();

	res.send(results).status(200);
});

/* EXPORT ROUTE */
module.exports = router;
