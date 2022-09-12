<script lang="ts">
	import { getMainStakingContract, type ValidatorPropCalls } from '$lib/aesdk/mainStaking';
	import type { AeSdkAepp } from '@aeternity/aepp-sdk';

	export let sdk: AeSdkAepp;
	export let contractMethod: ValidatorPropCalls;
	export let previousValue: string;
	export let closeWindow: () => void;

	let callingContract = false;
	let currentValue = previousValue || '';
	$: btnDisabled = callingContract ? 'btn-disabled' : '';
</script>

<div class="card  p-2">
	<div class="card-title">Edit value for {contractMethod}</div>
	<div class="card-body p-1">
		<div class="space-x-4">
			<p>
				Previous value: {previousValue}
			</p>
			<label class="label flex-auto">
				set to: <input bind:value={currentValue} class="input input-bordered w-10/12" />
			</label>
		</div>
	</div>
	<div class="card-actions justify-end">
		{#if callingContract}
			<progress class="progress progress-primary w-full"></progress>
		{/if}
		<button
			class="flex-end btn btn-success {btnDisabled}"
			on:click={async () => {
				callingContract = true;
				const contr = await getMainStakingContract(sdk);
				// console.log('contr', contr);
				console.log('setting to', currentValue);
				// const ret = await contr?.methods.set_validator_avatar_url(image_url);
				const ret = await contr
					?.call(contractMethod, [currentValue], {
						callStatic: false
					})
					.finally(closeWindow);
				console.log('ret', ret);
			}}>submit</button
		>
	</div>
</div>
