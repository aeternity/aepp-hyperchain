import type { PageServerLoad } from './$types';
import { toJSON } from '$lib/utils';
import { getValidatorByAk } from '../../../lib/aesdk/contractState';

export const load: PageServerLoad = async ({ params, locals }) => {
	const ak = params['ak'];
	const state = locals.stateWithTimestamp;
	if (!ak || !state || !getValidatorByAk(state.st.validators, ak)) {
		return { status: 404 };
	}
	return { state: toJSON(locals.stateWithTimestamp) };
};
