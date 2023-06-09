const mongoose = require('mongoose');

const MONGO_DB = process.env.MONGO_DB;

exports.connect = () => {
	// Connecting to the database
	mongoose
		.connect(MONGO_DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Successfully connected to database');
		})
		.catch((error) => {
			console.log('database connection failed. exiting now...');
			console.error(error);
			process.exit(1);
		});
};
