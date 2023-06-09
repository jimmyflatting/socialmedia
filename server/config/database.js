import mongoose from 'mongoose';

const MONGO_DB = process.env.MONGO_DB;

const connect = () => {
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

export { connect };
