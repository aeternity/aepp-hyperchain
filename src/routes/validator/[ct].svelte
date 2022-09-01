<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { getAddrShares, MainStakingState } from '../../lib/aesdk/contractState';
	import { fromJSON } from '../../lib/utils';
	import ValidatorCard from '../../lib/components/ValidatorCard.svelte';
	import { getValidatorByAk, getValidatorByCt } from '../../lib/serverConfig';
	import AeAmount from '../../lib/components/CoinAmount.svelte';
	import { walletConnectionStore } from '../../lib/stores/walletConnectionStore';
	import { sharesToAetto } from '../../lib/aesdk/contractState.js';
	import StakingCard from '../../lib/components/StakingCard.svelte';
	import { validatorsStore } from '$lib/stores/validatorsSore';

	export var state: string;
	const ct: string = $page.params['ct'];

	$: stateFromStore = $validatorsStore ? $validatorsStore : null;
	$: stDecoded = stateFromStore ? stateFromStore : MainStakingState.parse(fromJSON(state));
	$: currentLeader = getValidatorByAk(stDecoded.leader);
	$: validator = stDecoded.validators.find((v) => v.ct == ct);
</script>

<div class="container bg-neutral p-4 space-y-4">
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
				{#each Object.entries(validator.state.delegates) as [del, amount], i}
					<div class="navbar rounded-md bg-base-100 p-2">
						<div class="navbar-start ">
							<div>{del}</div>
						</div>
						<div class="navbar-end space-x-2">
							<div class="border rounded-md p-1">{amount} shares</div>
							<AeAmount aetto={sharesToAetto(validator, amount)} dropdownReverse />
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
