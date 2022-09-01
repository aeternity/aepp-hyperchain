import { MainStakingState } from '$lib/aesdk/contractState';
import { fromJSON } from '$lib/utils';
import { get, writable } from 'svelte/store';

export const fetchValidatorsState = async () => {
	const resp = await fetch('/validators', { headers: { accept: 'application/json' } });
	const jsn = resp.ok ? await resp.json() : null;
	const validatorsState = jsn ? MainStakingState.parse(fromJSON(jsn.state)) : null;
	// console.log('respBody', validatorsState);
	validatorsStore.set(validatorsState);
};

export const validatorsStore = writable<StateDecodedResult | null>(null);
