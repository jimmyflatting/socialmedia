const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/user');

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

router.put('/profile/update/:author', async (req, res) => {
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

		// Save the updated user
		await user.save();

		res.status(200).json({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			userHandle: user.userHandle,
		});
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
