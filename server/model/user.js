const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	profileImg: { type: String, default: null },
	firstName: { type: String, default: null },
	lastName: { type: String, default: null },
	email: { type: String, unique: true },
	userHandle: { type: String, unique: true },
	location: { type: String, default: null },
	workplace: { type: String, default: null },
	password: { type: String },
	posts: { type: Array },
	token: { type: String },
	followers: { type: Array },
	following: { type: Array },
});

module.exports = mongoose.model('user', userSchema);
