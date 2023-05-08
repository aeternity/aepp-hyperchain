import type { AeSdkAepp } from '@aeternity/aepp-sdk';
import aci from '$lib/contracts/MainStaking.aci.json';
import { get } from 'svelte/store';
import { clientGlobalConfigStore } from '$lib/stores/clientGlobalConfigStore';

export function getMainStakingContract(sdk: AeSdkAepp) {
	const contractAddress = get(clientGlobalConfigStore)?.stakingContract;
	const instance = contractAddress
		? sdk.initializeContract({ aci, address: contractAddress })
		: null;
	return instance;
}

export type ValidatorPropCalls =
	| 'set_validator_avatar_url'
	| 'set_validator_description'
	| 'set_validator_name';
