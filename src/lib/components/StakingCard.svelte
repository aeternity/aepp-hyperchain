<script lang="ts">
	import { getAddrShares, Validator } from '../aesdk/contractState';
	import { sharesToAetto } from '../aesdk/contractState.js';
	import AeAmount from './AeAmount.svelte';
	import { walletConnectionStore } from '../stores/walletConnectionStore';
	import StakingInput from './StakingInput.svelte';
	import { clientGlobalConfigStore, minStakeAetto } from '$lib/stores/clientGlobalConfigStore';
	import UnstakingInput from './UnstakingInput.svelte';

	export let validator: Validator;
	$: wallet = $walletConnectionStore.connectedWallet;
	$: myShares = wallet?.addr ? getAddrShares(validator, wallet.addr) || 0n : 0n;
	$: aettoStaked = sharesToAetto(validator, myShares);

	let modalOpen: null | 'staking' | 'unstaking' = null;
</script>

{#if wallet}
	<div class="card p-2 shadow-xl bg-base-100 ">
		<div class="card-body">
			<p>
				Your stake with {validator.state.name}:
				<span class="text-secondary font-bold">{myShares} shares</span>,
				<AeAmount aetto={aettoStaked} />
			</p>
		</div>
		<div class="card-actions align-middle">
			<button class="btn btn-primary w-52" on:click={() => (modalOpen = 'staking')}>Stake</button>
			{#if myShares}
				<button class="btn btn-secondary w-52" on:click={() => (modalOpen = 'unstaking')}>
					Unstake
				</button>
			{/if}
		</div>
		<div
			class="modal {!!modalOpen && 'modal-open'}"
			on:click={() => {
				modalOpen = null;
			}}
		>
			<div class="modal-box max-w-3xl" on:click|stopPropagation>
				<button
					on:click={() => (modalOpen = null)}
					class="btn btn-sm btn-circle btn-secondary absolute right-1 top-1"
					>✕
				</button>
				<div>
					<div class="mb-4">
						<p>
							Your stake with {validator.state.name}:
							<span class="text-secondary font-bold">{myShares} shares</span>,
							<AeAmount aetto={aettoStaked} />
						</p>
						<p>Available in wallet: <AeAmount aetto={wallet.balAETTO} /></p>
						<p>Min Stake: <AeAmount aetto={$minStakeAetto} /></p>
					</div>
					{#if modalOpen === 'staking'}
						<StakingInput aettoAvailable={wallet.balAETTO} {validator} />
					{:else if modalOpen === 'unstaking'}
						<UnstakingInput sharesInValidator={myShares} {validator} />
					{/if}
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="alert-warning rounded-full pl-3">No wallet connected</div>
{/if}
