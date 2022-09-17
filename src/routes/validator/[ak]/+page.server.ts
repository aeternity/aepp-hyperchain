import type { PageServerLoad } from './$types';
import { toJSON } from '$lib/utils';
import { getValidatorByAk } from '../../../lib/aesdk/contractState';

export const load: PageServerLoad = async (request) => {
	const ak = request.params['ak'];
	const state = request.locals.stateWithTimestamp;
	if (!ak || !state || !getValidatorByAk(state.st.validators, ak)) {
		return { status: 404 };
	}
	return { state: toJSON(request.locals.stateWithTimestamp) };
};
