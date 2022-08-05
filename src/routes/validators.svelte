<script lang="ts">
	import { browser } from '$app/env';
	import { aettoToAe, fromJSON } from '../lib/utils';
	import { StateDecodedResult } from '../lib/aesdk/contractState';
	import { getValidatorByAk } from '../lib/serverConfig';
	import ValidatorCard from '$lib/components/ValidatorCard.svelte';
	import AeAmount from '../lib/components/CoinAmount.svelte';
	import { validatorsStore } from '$lib/stores/validatorsSore';

	export var state: string;
	$: stateFromStore = $validatorsStore ? $validatorsStore : null;
	$: stDecoded = stateFromStore ? stateFromStore : StateDecodedResult.parse(fromJSON(state));
	$: currentLeader = stDecoded ? getValidatorByAk(stDecoded.leader) : null;
</script>

{#if stDecoded}
	<div class="xl:container bg-neutral pt-1 pb-2 min-h-full">
		<div
			class="card overflow-visible rounded-b-box shadow-lg mb-2 ml-2 mr-2 bg-base-100  border-primary/50"
		>
			<div class="p-4 card-body">
				<div class="flex">
					<span class="flex-auto"
						>Total Stake In Validators: <AeAmount aetto={stDecoded.total_stake} /></span
					>
					<span class="flex-end">
						Minimum Stake: <AeAmount aetto={stDecoded.stake_minimum} dropdownReverse />
					</span>
				</div>
			</div>
		</div>
		<div class="p-4 space-y-4">
			{#each stDecoded.validators as validator}
				<ValidatorCard {validator} {currentLeader} displayStakingButton={true} />
			{/each}
		</div>
	</div>
{:else}
	<div class="alert alert-error">Failed to fetch validators state</div>
{/if}
