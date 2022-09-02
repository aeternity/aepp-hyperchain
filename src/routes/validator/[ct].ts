import type { RequestHandler } from '@sveltejs/kit';
import { toJSON } from '$lib/utils';
import { getValidatorByCt } from '../../lib/aesdk/contractState';

export const GET: RequestHandler = async (request) => {
	const ct = request.params['ct'];
	const state = request.locals.stateWithTimestamp;
	if (!ct || !state || !getValidatorByCt(state.st.validators, ct)) {
		return { status: 404 };
	}
	return {
		status: 200,
		body: { state: toJSON(request.locals.stateWithTimestamp) }
	};
};
