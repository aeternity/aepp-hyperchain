import type { RequestHandler } from '@sveltejs/kit';
import { getContractState } from '$lib/aesdk/contractState';
import { toJSON } from '../lib/utils';

export const GET: RequestHandler = async (request) => {
	const contractState = await getContractState(request.locals.serverConfig.sdkInstance);
	return {
		status: 200,
		body: { state: toJSON(contractState) }
	};
};
