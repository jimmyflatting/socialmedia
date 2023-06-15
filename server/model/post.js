import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	content: { type: String },
	imgSrc: { type: String },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	createdAt: { type: Date, default: Date.now },
});

postSchema.methods.addToUserPosts = async function (userID) {
	try {
		const user = await mongoose.model('user').findById(userID);
		user.posts.push(this._id);
		await user.save();
	} catch (error) {
		console.error(error);
	}
};

const Post = mongoose.model('Post', postSchema);

export { Post };
