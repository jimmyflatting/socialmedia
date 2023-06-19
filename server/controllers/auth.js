import bcrypt from 'bcryptjs';
import { User } from '../model/user.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
	try {
		if (req.body.password) {
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(req.body.password, salt);

			const newUser = new User({
				profileImg: req.body.profileImg,
				displayName: req.body.displayName,
				userHandle: req.body.userHandle,
				email: req.body.email,
				password: hashedPassword,
			});

			await newUser.save();
			res.status(201).json('New User Created');
		} else {
			res.status(403).json('please provide a password');
		}
	} catch (err) {
		res.status(500).json(err.message);
	}
};

export const login = async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		});

		if (!user) {
			return res.status(404).json('no user found');
		}

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!isPasswordCorrect) {
			return res.status(400).json('wrong password');
		}

		const payload = {
			id: user._id,
		};
		const token = jwt.sign(payload, process.env.TOKEN_KEY, {
			expiresIn: '1h',
		});
		res.status(202)
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.json({ message: 'Login successful' });
	} catch (err) {
		res.status(500).json(err.message);
	}
};

export const logout = (req, res) => {
	res.clearCookie('access_token');
	res.status(200).json('Logout success');
};

export const validate = (req, res) => {
	const token = req.cookies.access_token;
	if (!token) {
		return res.status(401).json('No token found');
	}

	jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
		if (err) {
			return res.status(403).json('Invalid Token');
		}
		req.user = {
			id: payload.id,
		};
		res.status(200).json('Token validated');
	});
};
