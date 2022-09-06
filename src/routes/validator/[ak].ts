import type { RequestHandler } from '@sveltejs/kit';
import { toJSON } from '$lib/utils';
import { getValidatorByAk } from '../../lib/aesdk/contractState';

export const GET: RequestHandler = async (request) => {
	const ak = request.params['ak'];
	const state = request.locals.stateWithTimestamp;
	if (!ak || !state || !getValidatorByAk(state.st.validators, ak)) {
		return { status: 404 };
	}
	return {
		status: 200,
		body: { state: toJSON(request.locals.stateWithTimestamp) }
	};
};
