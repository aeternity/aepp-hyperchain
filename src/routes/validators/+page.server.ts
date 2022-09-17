import { toJSON } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	return { state: toJSON(locals.stateWithTimestamp) };
};
