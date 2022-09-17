import { toJSON } from '$lib/utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url, request, locals }) => {
	return json({ state: toJSON(locals.stateWithTimestamp) });
};
