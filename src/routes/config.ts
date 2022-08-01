import { toJSON } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export type ClientGlobalConfig = {
	wallet: string;
	faucet: string;
	node: string;
	networkId: string;
	minStakeAetto: string;
};

export const GET: RequestHandler = (event) => {
	const { aeWalletURL, aeFaucetURL, aeNodeURL, networkId } = event.locals.serverConfig;
	const minStake = toJSON(event.locals.stateWithTimestamp.st.stake_minimum);
	return {
		code: 200,
		body: {
			wallet: aeWalletURL,
			faucet: aeFaucetURL,
			node: aeNodeURL,
			networkId,
			minStakeAetto: minStake
		} as ClientGlobalConfig
	};
};
