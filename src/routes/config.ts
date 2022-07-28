import type { RequestHandler } from '@sveltejs/kit';

export type ClientGlobalConfig = {
	wallet: string;
	faucet: string;
	node: string;
	networkId: string;
};

export const GET: RequestHandler = (event) => {
	const { aeWalletURL, aeFaucetURL, aeNodeURL, networkId } = event.locals.serverConfig;
	return {
		code: 200,
		body: {
			wallet: aeWalletURL,
			faucet: aeFaucetURL,
			node: aeNodeURL,
			networkId
		} as ClientGlobalConfig
	};
};
