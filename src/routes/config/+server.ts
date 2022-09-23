import { toJSON } from '$lib/utils';
import type { RequestHandler } from './$types';
import type { ClientGlobalConfig } from '../../lib/ClientGlobalConfig';

export const GET: RequestHandler = (event) => {
	const { aeWalletURL, aeFaucetURL, aeNodeURL, networkId, stakingContract } =
		event.locals.serverConfig;
	const minStake = toJSON(event.locals.stateWithTimestamp?.st.stake_minimum || 0n);
	// Suggestion (check for correctness before using):
	return new Response(
		toJSON({
			wallet: aeWalletURL,
			faucet: aeFaucetURL,
			node: aeNodeURL,
			networkId,
			minStakeAetto: minStake,
			stakingContract
		} as ClientGlobalConfig),
		{
			headers: {
				'content-type': 'application/json; charset=utf-8'
			}
		}
	);
};
