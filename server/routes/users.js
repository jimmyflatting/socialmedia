const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

// middleware that is specific to this router
router.use((req, res, next) => {
	console.log('Time: ', Date.now());
	next();
});

/* FETCH 50 USERS */
router.get('/', async (req, res) => {
	const db = mongoose.connection.db;
	let collection = await db.collection('users');
	let results = await collection.find({}).limit(50).toArray();

	res.send(results).status(200);
});

/* REGISTER NEW USER */
router.post('/', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const collection = await db.collection('users');

		const email = req.body.email;
		const userHandle = req.body.userHandle;

		// Check if the email or userHandle is already in use
		const existingUser = await collection.findOne({
			$or: [{ email }, { userHandle }],
		});
		if (existingUser) {
			return res
				.status(400)
				.json({ error: 'Email or userHandle is already in use' });
		}

		const newDocument = {
			...req.body,
			date: new Date(),
		};

		const result = await collection.insertOne(newDocument);
		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

/* UPDATE CURRENT USER */
router.put('/settings/:id', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const collection = db.collection('users');
		const query = { _id: new ObjectId(req.params.id) };
		const item = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			userHandle: req.body.userHandle,
			userPicture: req.body.userPicture,
		};

		const result = await collection.updateOne(query, { $set: item });

		if (result.modifiedCount === 0) {
			res.status(404).send('User not found');
		} else {
			res.status(200).send(result);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

/* FETCH SINGLE USER (OBJECTID) */
router.get('/:id', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const collection = await db.collection('users');
		const query = { _id: new ObjectId(req.params.id) };
		const result = await collection.findOne(query);

		if (!result) {
			res.status(404).send('User not found');
		} else {
			res.status(200).send(result);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

/* EXPORT USER ROUTES */
module.exports = router;
