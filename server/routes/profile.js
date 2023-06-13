const express = require('express');
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

// Add & Remove friends
router.put('/friends/:userHandle', async (req, res) => {
	try {
		const { action, userId } = req.body;
		const userHandle = req.params.userHandle;

		// Find users bsed on userHandle
		const user = await User.findOne({ userHandle: userHandle });
		const followUser = await User.findOne({ userHandle: userId });

		if (!user || !followUser) {
			return res.status(404).json({ message: 'User(s) not found' });
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

		await followUser.save();
		await user.save();

		res.status(200).json({
			message: `${user.userHandle} is now following ${followUser.userHandle}`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

// Update user profile
router.put('/:userHandle', upload.single('profileImage'), async (req, res) => {
	try {
		const userHandle = req.params.userHandle;

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

		// Update the user's profile fields
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

			const s3UploadResponse = await s3Client.upload(s3Params).promise();
			const imageUrl = s3UploadResponse.Location;

			// Update the user's profile image
			user.profileImg = imageUrl;
		}

		// Save the updated user
		await user.save();

		res.status(200).json({ message: `${userHandle} is updated` });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error });
	}
});

/* EXPORT ROUTE */
module.exports = router;
