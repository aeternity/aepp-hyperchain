import type { RequestHandler } from '@sveltejs/kit';
import { toJSON } from '$lib/utils';
import { getValidatorByCt } from '../../lib/serverConfig';

export const GET: RequestHandler = async (request) => {
	const ct = request.params['ct'];
	if (!ct || !getValidatorByCt(ct)) {
		return { status: 404 };
	}
	return {
		status: 200,
		body: { state: toJSON(request.locals.stateWithTimestamp.st) }
	};
};
