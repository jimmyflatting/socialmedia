import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';

export const getUserHandle = async (req, res) => {
	try {
		const db = mongoose.connection.db;
		const userHandle = req.params.userHandle;

		let query = { userHandle: userHandle };

		let collection = db.collection('users');
		const user = await collection.findOne(query);

		if (user) {
			res.status(200).json({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userHandle: user.userHandle,
				location: user.location,
				workplace: user.workplace,
				profileImg: user.profileImg,
				followers: user.followers,
				following: user.following,
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
};

export const getUser = async (req, res) => {
	const token = req.cookies.access_token;
	if (!token) {
		return res.status(401).json('No token found');
	}

	try {
		const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
		const userId = decodedToken.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
	}
};
