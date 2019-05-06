#!/usr/bin/env node
process.on('SIGTERM', () => {
	process.exit(0);
});
process.on('SIGINT', () => {
	process.exit(0);
});
import * as http from 'http';
import {config} from 'dotenv';
config();
import * as debug0 from 'debug';

/**
 * Module dependencies.
 */
import app from "../app";

const debug = debug0('server');
/**
 * Get port from environment and store in Express.
 */

const port: number = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server: http.Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port: number = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}
export interface serverAddress {
	address: string;
	family: string;
	port: number;
}
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr: serverAddress = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}