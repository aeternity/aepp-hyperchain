import { ContractState, type ContractsState } from '$lib/aesdk/contractState';
import { fromJSON } from '$lib/utils';
import { writable } from 'svelte/store';

export const fetchValidatorsState = async () => {
	const resp = await fetch('/validators-data', { headers: { accept: 'application/json' } });
	const jsn = resp.ok ? await resp.json() : null;
	const validatorsState = jsn ? ContractState.parse(fromJSON(jsn.state)) : null;
	// console.log('state', validatorsState);
	validatorsStore.set(validatorsState);
};

export const validatorsStore = writable<ContractsState | null>(null);
