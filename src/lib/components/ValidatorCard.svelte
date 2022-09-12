<script lang="ts">
	import type { Validator } from '$lib/aesdk/contractState';
	import OnlineStatusBadge from '$lib/components/OnlineStatusBadge.svelte';
	import { walletConnectionStore } from '$lib/stores/walletConnectionStore';
	import AeAmount from './CoinAmount.svelte';
	import Fa from 'svelte-fa';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';

	export var validator: Validator;
	export var currentLeader: Validator | undefined | null;
	export var displayStakingButton = false;
	$: wallet = $walletConnectionStore.connectedWallet;
</script>

<div class="card shadow-lg bg-base-100 overflow-visible">
	<div class="card-body p-4">
		<div class="card-title flex-1 align-top">
			<a sveltekit:prefetch href={`/validator/${validator.address}`}>
				<div class="avatar  mr-4 shadow-sm">
					<div class="w-16 rounded  border-neutral border-2">
						<img
							src={validator.state.image_url}
							alt={validator.state.image_url ? 'avatar' : 'no avatar'}
						/>
					</div>
				</div>
			</a>
			<div class="flex flex-auto align-top ">
				<h3 class="mr-4">
					<a sveltekit:prefetch class="link link-primary" href={`/validator/${validator.address}`}>
						{validator.state.name || '[no name]'}
					</a>
				</h3>
				<OnlineStatusBadge online={validator.is_online} />
				{#if currentLeader?.address === validator.address}
					<div class="badge badge-outline badge-info ml-2">Current leader</div>
				{/if}
			</div>
			<div class="flex-end">
				{#if validator.address === wallet?.addr}
					<a
						sveltekit:prefetch
						class="btn btn-secondary btn-outline"
						href={`/validator/${validator.address}/edit`}
					>
						Edit Validator <Fa class="ml-2" icon={faEdit} size="lg" />
					</a>
				{/if}
				{#if displayStakingButton}
					<a
						sveltekit:prefetch
						class="btn btn-primary shadow"
						href={`/validator/${validator.address}`}
					>
						Staking
					</a>
				{/if}
			</div>
		</div>
		<p>{validator.state.description || '[no description]'}</p>
		<p>
			<AeAmount aetto={validator.stake} />
			staked by {Object.keys(validator.state.delegates).length} delegators
		</p>
		<p class="text-secondary">{validator.state.shares} shares</p>
	</div>
</div>
