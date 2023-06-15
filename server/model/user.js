import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	profileImg: { type: String, default: null },
	displayName: { type: String },
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

const User = mongoose.model('user', userSchema);

export { User };
