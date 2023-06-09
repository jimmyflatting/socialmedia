const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	content: { type: String },
	imgSrc: { type: String },
	author: { type: String },
});

module.exports = mongoose.model('post', postSchema);
