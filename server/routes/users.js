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
			const { action, userId } = req.body;

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

			// Find the user to follow/unfollow based on the userId
			const followUser = await User.findOne({ userHandle: userId });

			if (!followUser) {
				return res
					.status(404)
					.json({ message: 'User to follow/unfollow not found' });
			}

			// Add or remove user from following based on the action
			if (action === 'add') {
				if (!user.following.includes(userId)) {
					user.following.push(userId);
					followUser.followers.push(user.userHandle);
				}
			} else if (action === 'remove') {
				const userIndex = user.following.indexOf(userId);
				const followUserIndex = followUser.followers.indexOf(
					user.userHandle
				);
				if (userIndex !== -1) {
					user.following.splice(userIndex, 1);
				}
				if (followUserIndex !== -1) {
					followUser.followers.splice(followUserIndex, 1);
				}
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

			// Save the updated user and the user to follow/unfollow
			await user.save();
			await followUser.save();

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

router.get('/profile/:identifier', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const identifier = req.params.identifier;

		let query;
		if (mongoose.Types.ObjectId.isValid(identifier)) {
			// If the identifier is a valid ObjectId, search by _id
			query = { _id: new mongoose.Types.ObjectId(identifier) };
		} else {
			// Otherwise, search by userHandle
			query = { userHandle: identifier };
		}

		let collection = db.collection('users');
		const user = await collection.findOne(query);

		if (user) {
			res.status(200).json({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userHandle: user.userHandle,
				posts: user.posts,
				profileImg: user.profileImg,
				id: user._id,
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
				followers: user.followers,
				following: user.following,
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
