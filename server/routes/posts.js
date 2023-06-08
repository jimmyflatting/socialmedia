const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

// middleware that is specific to this router
router.use((req, res, next) => {
	console.log('Time: ', Date.now());
	next();
});

/* FETCH 50 POSTS */
router.get('/', async (req, res) => {
	const db = mongoose.connection.db;
	let collection = await db.collection('posts');
	let results = await collection.find({}).limit(50).toArray();

	res.send(results).status(200);
});

/* CREATE NEW POST */
router.post('/', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const collection = await db.collection('posts');

		const newDocument = {
			...req.body,
			date: new Date(),
		};

		const result = await collection.insertOne(newDocument);
		res.status(204).send(result);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

/* UPDATE CURRENT POST */
router.put('/post/:id', async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const collection = db.collection('posts');
		const query = { _id: new ObjectId(req.params.id) };
		const item = {
			author: req.body.author,
			body: req.body.body,
			postPicture: req.body.postPicture,
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

/* EXPORT POSTS ROUTES */
module.exports = router;
