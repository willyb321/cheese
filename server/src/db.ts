import * as mongoose from 'mongoose';

mongoose.connect(
	`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${
		process.env.DB_NAME
	}`
);
export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Connected!');
});
