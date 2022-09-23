import { browser } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { configServer, type ServerConfig } from './lib/serverConfig';
import type { ContractsState } from './lib/aesdk/contractState';
import { getContractState } from './lib/aesdk/contractState';
import { unixTime } from './lib/utils';
import { getHeight } from '@aeternity/aepp-sdk';

let serverConfig: ServerConfig | null = null;
let validatorsState: ContractsState | null = null;

async function updateState() {
	if (!serverConfig) {
		console.log('Configuring server...');
		serverConfig = await configServer();
	}
	const [contractState, hcElection] = await getContractState(serverConfig.sdkInstance);
	// console.log('hcElectionState', hcElection);
	const height = BigInt(await getHeight({ onNode: serverConfig.sdkInstance.node }));
	validatorsState = { st: contractState, hcElection, ts: BigInt(unixTime()), height };
}

async function updateStateRepeatedly() {
	// console.log('updating state...');
	await updateState()
		.catch((err) => {
			console.error(`Failed to update contract state: ${err}`);
		})
		.finally(() => {
			setTimeout(updateStateRepeatedly, 5000);
		});
}

if (!browser) {
	dotenv.config();
	updateStateRepeatedly();
}

export const handle: Handle = async ({ event, resolve }) => {
	// console.log('url', event.url.pathname);
	if (event.url.pathname === '/alive') {
		return resolve(event);
	}
	// console.log('serverConfig', serverConfig);
	if (!serverConfig) {
		try {
			serverConfig = await configServer();
		} catch (err) {
			console.error('Error configuring server', err);
			return new Response(`Error ${err}`, { status: 500 });
		}
	}
	if (serverConfig) {
		event.locals.serverConfig = serverConfig;
		if (!validatorsState?.ts || validatorsState.ts < unixTime() - 20) {
			// console.log('Updating validators state...');
			try {
				await updateState();
			} catch (err) {
				console.error('Error fetching contract state', err);
				return new Response(`Error ${err}`, { status: 500 });
			}
		}
	}
	event.locals.stateWithTimestamp = validatorsState;
	return resolve(event);
};
