<script lang="ts">
	import { fromJSON } from '../../lib/utils';
	import { ContractState, getValidatorByAk } from '../../lib/aesdk/contractState';
	import ValidatorCard from '$lib/components/ValidatorCard.svelte';
	import AeAmount from '../../lib/components/CoinAmount.svelte';
	import { validatorsStore } from '$lib/stores/validatorsSore';
	import type { PageData } from './$types';

	export var data: PageData;
	$: state = data.state;
	$: stateFromStore = $validatorsStore ? $validatorsStore : null;
	$: stDecoded = stateFromStore ? stateFromStore : ContractState.parse(fromJSON(state));
	$: currentLeader = stDecoded
		? getValidatorByAk(stDecoded.st.validators, stDecoded.hcElection.leader)
		: null;
</script>

{#if stDecoded}
	<div class="xl:container bg-neutral pt-1 pb-2 min-h-full">
		<div
			class="card overflow-visible rounded-b-box shadow-lg mb-2 ml-2 mr-2 bg-base-100  border-primary/50"
		>
			<div class="p-2 md:p-4 card-body">
				<div class="grid grid-cols-1 md:grid-cols-3">
					<span class="flex-auto"
						>Total Stake In Validators: <AeAmount aetto={stDecoded.st.total_stake} /></span
					>
					<span class="flex-auto">
						Height: {stDecoded.height}
					</span>
					<span class="flex-end">
						Minimum Stake: <AeAmount aetto={stDecoded.st.stake_minimum} dropdownReverse />
					</span>
				</div>
			</div>
		</div>
		<div class="p-2 md:p-4 space-y-4">
			{#each stDecoded.st.validators as validator}
				<ValidatorCard {validator} {currentLeader} displayStakingButton={true} />
			{/each}
		</div>
	</div>
{:else}
	<div class="alert alert-error">Failed to fetch validators state</div>
{/if}
