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
		const user = await collection.findOne({ userHandle: userHandle }); // Match based on email address

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
				// author: authorEmail,
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
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userHandle: user.userHandle,
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
