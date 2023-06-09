const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: { type: String, default: null },
	lastName: { type: String, default: null },
	email: { type: String, unique: true },
	userHandle: { type: String, unique: true },
	password: { type: String },
	posts: { type: Array },
	token: { type: String },
});

module.exports = mongoose.model('user', userSchema);
