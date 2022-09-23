import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const configResp = await fetch('/config');
	const jsonResp = configResp.ok ? await configResp.json() : null;
	return {
		status: configResp.status,
		config: jsonResp || undefined
	};
};
