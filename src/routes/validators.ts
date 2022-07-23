import type { RequestHandler } from '@sveltejs/kit';
import { toJSON } from '$lib/utils';

export const GET: RequestHandler = async (request) => {
	return {
		status: 200,
		body: { state: toJSON(request.locals.stateWithTimestamp.st) }
	};
};
