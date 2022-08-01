<script lang="ts">
	import type { Validator } from '$lib/aesdk/contractState';
	import OnlineStatusBadge from '$lib/components/OnlineStatusBadge.svelte';
	import { aettoToAe } from '$lib/utils.js';
	import type { ValidatorDesc } from '$lib/serverConfig';
	import AeAmount from './AeAmount.svelte';

	export var validator: Validator;
	export var currentLeader: ValidatorDesc;
	export var displayStakingButton = false;
</script>

<div class="card shadow-lg bg-base-100 overflow-visible">
	<div class="card-body p-4">
		<div class="card-title flex-1 align-top align-text-top">
			<div class="avatar  mr-4 shadow-sm">
				<div class="w-16 rounded rounded-md border-neutral border-2">
					<img
						src={validator.state.image_url}
						alt={validator.state.image_url ? 'avatar' : 'no avatar'}
					/>
				</div>
			</div>
			<div class="flex flex-auto align-top ">
				<h3 class="mr-4">
					<a class="link link-primary" href={`/validator/${validator.ct}`}
						>{validator.state.name || '[no name]'}</a
					>
				</h3>
				<OnlineStatusBadge online={validator.is_online} />
				{#if currentLeader.ct === validator.ct}
					<div class="badge badge-outline badge-info ml-2">Current leader</div>
				{/if}
			</div>
			{#if displayStakingButton}
				<div class="flex-end">
					<a class="btn btn-primary shadow shadow-lg" href={`/validator/${validator.ct}`}>Staking</a
					>
				</div>
			{/if}
		</div>
		<p>{validator.state.description || '[no description]'}</p>
		<p>
			<AeAmount aetto={validator.stake} />
			staked by {Object.keys(validator.state.delegates).length} delegators
		</p>
		<p>shares {validator.state.shares}</p>
	</div>
</div>
