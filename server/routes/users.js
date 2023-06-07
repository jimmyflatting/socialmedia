const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
	console.log('Time: ', Date.now());
	next();
});
// define the home page route
router.get('/', (req, res) => {
	res.send('Users homepage');
});
// define the about route
router.get('/signup', (req, res) => {
	res.send('Signup');
});

module.exports = router;
