import 'dotenv/config';
import { connect } from './config/database.js';
import express from 'express';
import { auth } from './routes/auth.js';
import { post } from './routes/post.js';
import { profile } from './routes/profile.js';
import { users } from './routes/users.js';
import { checkAuth } from './middleware/checkAuth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://socialmedia-frontend-zeta.vercel.app',
		],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'This is message' });
});

app.use('/auth', auth);
app.use('/post', checkAuth, post);
app.use('/profile', checkAuth, profile);
app.use('/users', checkAuth, users);

connect();

export default app;
