
import * as express from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as responseTime from 'response-time';

// Routes
import index from './routes/index';
import image from './routes/image';

process.on('uncaughtException', (err: Error) => {
	console.log(err);
});

process.on('unhandledRejection', (err: Error) => {
	console.log(err);
});

const app: express.Application = express();

app.use(responseTime());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', index);
app.use('/i', image);

export default app;
