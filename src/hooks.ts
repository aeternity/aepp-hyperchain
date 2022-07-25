import { browser } from '$app/env';
import type { GetSession, Handle } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { configServer, type ServerConfig } from './lib/serverConfig';
import type { ContractStateWithTimestamp } from './lib/aesdk/contractState';
import { getContractState } from './lib/aesdk/contractState';
import { unixTime } from './lib/utils';

if (!browser) {
	dotenv.config();
}

let serverConfig: ServerConfig | null = null;
let validatorsState: ContractStateWithTimestamp | null = null;

export const handle: Handle = async ({ event, resolve }) => {
	if (!serverConfig) {
		console.log('Configuring server...');
		serverConfig = await configServer();
	}
	if (!serverConfig) {
		throw new Error('Server not configured properly. serverConfig object is null');
	}
	event.locals.serverConfig = serverConfig;

	if (!validatorsState?.ts || validatorsState.ts < unixTime() - 30) {
		console.log('Updating validators state...');
		const contractState = await getContractState(serverConfig.sdkInstance);
		validatorsState = { st: contractState, ts: unixTime() };
	}
	if (!validatorsState) {
		throw new Error('Validators state is null!');
	}
	event.locals.stateWithTimestamp = validatorsState;
	return resolve(event);
};

// export const getSession: GetSession = async (event) => {
// 	event
// };
