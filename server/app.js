require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const auth = require('./middleware/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const login = require('./routes/login');
const register = require('./routes/register');
const posts = require('./routes/post');
const session = require('./routes/session');
const users = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'This is message' });
});

app.use('/check-session', session);
app.use('/register', register);
app.use('/login', login);
app.use('/posts', posts);
app.use('/users', users);

module.exports = app;
