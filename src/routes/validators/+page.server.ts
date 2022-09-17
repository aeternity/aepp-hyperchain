import { toJSON } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
	return { state: toJSON(request.locals.stateWithTimestamp) };
};
