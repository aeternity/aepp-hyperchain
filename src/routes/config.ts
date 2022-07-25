import type { RequestHandler } from '@sveltejs/kit';

export type GlobalConfig = { wallet: string; faucet: string };

export const GET: RequestHandler = (event) => {
	const { aeWalletURL, aeFaucetURL } = event.locals.serverConfig;
	return { code: 200, body: { wallet: aeWalletURL, faucet: aeFaucetURL } };
};
