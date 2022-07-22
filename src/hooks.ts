import { browser } from '$app/env';
import type { Handle } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { configServer, type ServerConfig } from './serverConfig';

if (!browser) {
	dotenv.config();
}

let serverConfig: ServerConfig | null = null;

export const handle: Handle = async ({ event, resolve }) => {
	if (!serverConfig) {
		console.log('Configuring server...');
		serverConfig = await configServer();
	}
	if (!serverConfig) {
		throw new Error('Server not configured properly. serverConfig object is null');
	}
	event.locals.serverConfig = serverConfig;

	const response = await resolve(event);
	return response;
};
