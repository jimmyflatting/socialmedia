require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const auth = require('./middleware/auth');
const cors = require('cors');

const app = express();
const login = require('./routes/login');
const register = require('./routes/register');
const posts = require('./routes/posts');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'This is message' });
});

app.use('/register', register);
app.use('/login', login);
app.use('/posts', posts);

module.exports = app;
