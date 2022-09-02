import { toJSON } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export type ClientGlobalConfig = {
	wallet: string;
	faucet: string;
	node: string;
	networkId: string;
	minStakeAetto: string;
	stakingContract: string;
};

export const GET: RequestHandler = (event) => {
	const { aeWalletURL, aeFaucetURL, aeNodeURL, networkId, stakingContract } =
		event.locals.serverConfig;
	const minStake = toJSON(event.locals.stateWithTimestamp?.st.stake_minimum || 0n);
	return {
		code: 200,
		body: {
			wallet: aeWalletURL,
			faucet: aeFaucetURL,
			node: aeNodeURL,
			networkId,
			minStakeAetto: minStake,
			stakingContract
		} as ClientGlobalConfig
	};
};
