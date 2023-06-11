const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/user');

router.get('/profile', async (req, res) => {
	try {
	  const token = req.headers.authorization.split(' ')[1];
	  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
	  const user = await User.findOne({"sessions.token": decodedToken})
  
	  if (user) {
		res.status(200).json({
		  firstName: user.firstName,
		  lastName: user.lastName,
		  email: user.email,
		  userHandle: user.userHandle,
		  // Include other profile fields as needed
		});
	  } else {
		res.status(404).json({ message: 'User not found' });
	  }
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ message: 'Server error' });
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
