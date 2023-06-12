const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	content: { type: String },
	imgSrc: { type: String },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

postSchema.methods.addToUserPosts = async function (userID) {
	try {
		// Find the user with the given userID
		const user = await mongoose.model('user').findById(userID);

		// Add the postID to the user's post array
		user.posts.push(this._id);

		// Save the user
		await user.save();
	} catch (error) {
		// Handle error
		console.error(error);
	}
};

module.exports = mongoose.model('post', postSchema);
