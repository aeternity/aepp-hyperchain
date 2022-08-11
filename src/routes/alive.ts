import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = (event) => {
	return {
		code: 200,
		body: {
			alive: true
		}
	};
};
