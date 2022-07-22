<script lang="ts">
	import { browser } from "$app/env";
	import { formatAE, fromJSON } from "../lib/utils";
	import { StateDecodedResult } from "../lib/aesdk/contractState";
	import OnlineStatusBadge from "../lib/components/OnlineStatusBadge.svelte";

	export var state: string | null;
	const jsonDecoded = fromJSON(state);
	const stDecoded = StateDecodedResult.parse(jsonDecoded);

	if (browser) {
		// console.log(state);
		// console.log(stDecoded);
	}
</script>

<div class="xl:container bg-neutral pt-2 pb-2 min-h-full">
	<div class="card shadow-lg m-2 bg-base-100">
	<div class="card-body p-4 ">
		<div class="flex">
			<span class="flex-auto">Total stake in validators: {formatAE(stDecoded.total_stake)}</span>
			<span class="flex-auto">validator_min_stake: {formatAE(stDecoded.validator_min_stake)}</span>
			<span class="flex-end"> stake_minimum: {formatAE(stDecoded.stake_minimum)}</span>
		</div>
	</div>
	</div>
	{#each stDecoded.validators as validator}
		<div class="card shadow-lg bg-base-100 m-4 ">
			<div class="card-body">
				<div class="flex">
					<div class="avatar mr-4">
						<div class="w-16 rounded">
							<img src="{validator.state.image_url}"  alt="avatar"/>
						</div>
					</div>
					<div class="card-title flex-1">{validator.state.name || '[no name]'}</div>
					<OnlineStatusBadge online={validator.is_online} />
				</div>
				<p>{validator.state.description || '[no description]'}</p>
				<p>stake {formatAE(validator.stake) } by {Object.keys(validator.state.delegates).length} delegates</p>
<!--				<p>shares {validator.state.shares}</p>-->
			</div>
		</div>
	{/each}
</div>
