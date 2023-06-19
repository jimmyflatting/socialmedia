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
const corsOptions = {
	origin: [
		'http://localhost:3000',
		'http://127.0.0.1',
		'http://104.142.122.231',
	],
	credentials: true,
	exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions));

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
