<script lang="ts">
	import { page } from '$app/stores';
	import { ContractState, getValidatorByAk } from '../../../lib/aesdk/contractState';
	import { fromJSON } from '../../../lib/utils';
	import ValidatorCard from '../../../lib/components/ValidatorCard.svelte';
	import AeAmount from '../../../lib/components/CoinAmount.svelte';
	import { sharesToAetto } from '../../../lib/aesdk/contractState.js';
	import StakingCard from '../../../lib/components/StakingCard.svelte';
	import { validatorsStore } from '$lib/stores/validatorsSore';
	import type { PageData } from './$types';

	export let data: PageData;
	$: state = data.state;
	const ak: string = $page.params['ak'];

	$: stateFromStore = $validatorsStore ? $validatorsStore : null;
	$: stDecoded = stateFromStore || (state ? ContractState.parse(fromJSON(state)) : null);
	$: currentLeader = stDecoded
		? getValidatorByAk(stDecoded.st.validators, stDecoded.hcElection.leader)
		: null;
	$: validator = stDecoded ? getValidatorByAk(stDecoded.st.validators, ak) : undefined;
</script>

<div class="container bg-neutral p-1 md:p-4 space-y-4">
	{#if !validator}
		<div>Validator not found</div>
	{:else}
		<ValidatorCard {validator} {currentLeader} />
		<StakingCard {validator} />
		<div class="container mx-auto ">
			<div class="prose">
				<h2>Delegators</h2>
			</div>
			<div class="space-y-2 max-w-5xl">
				{#each Object.entries(validator.state.delegates) as [del, amount]}
					<div class="grid grid-cols-auto rounded-md bg-base-100 p-2">
						<div class="">
							<div class="break-words break-all">{del}</div>
						</div>
						<div class="space-x-2">
							<div class="border rounded-md p-1">{amount} shares</div>
							<AeAmount aetto={sharesToAetto(validator, amount)} dropdownReverse />
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
