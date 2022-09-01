import { browser } from '$app/env';
import type { Handle } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { configServer, type ServerConfig } from './lib/serverConfig';
import type { ContractsState } from './lib/aesdk/contractState';
import { getContractState } from './lib/aesdk/contractState';
import { unixTime } from './lib/utils';

if (!browser) {
	dotenv.config();
}

let serverConfig: ServerConfig | null = null;
let validatorsState: ContractsState | null = null;

export const handle: Handle = async ({ event, resolve }) => {
	// console.log('url', event.url.pathname);
	if (event.url.pathname === '/alive') {
		return resolve(event);
	}
	// console.log('serverConfig', serverConfig);
	if (!serverConfig) {
		console.log('Configuring server...');
		try {
			serverConfig = await configServer();
		} catch (err) {
			console.error('Error configuring server', err);
			return new Response(`Error ${err}`, { status: 500 });
		}
	}
	event.locals.serverConfig = serverConfig;

	if (!validatorsState?.ts || validatorsState.ts < unixTime() - 2) {
		// console.log('Updating validators state...');
		const [contractState, leader] = await getContractState(serverConfig.sdkInstance);
		validatorsState = { st: contractState, leader, ts: unixTime() };
	}
	event.locals.stateWithTimestamp = validatorsState;
	return resolve(event);
};

// export const handleError: HandleError = ({ error, event }) => {
// 	console.log('error', error);
// };

// export const getSession: GetSession = async (event) => {
// 	event
// };
