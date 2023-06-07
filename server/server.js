const express = require('express');
const app = express();
const users = require('./routes/users');
const cors = require('cors');

/* CONFIG */

/* MIDDLEWARE */
app.use(
	cors({
		origin: '*',
		methods: ['GET'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

/* ROUTES */
app.get('/', (req, res) => {
	res.json({ message: '' });
});

app.use('/users', users);

/* STARTUP */
const PORT = 3001;
app.listen(PORT || 8001);
console.log(`Server start on port: ${PORT}`);
