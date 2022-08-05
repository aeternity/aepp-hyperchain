<script lang="ts">
	import { AeSdk, AE_AMOUNT_FORMATS, toAe, toAettos } from '@aeternity/aepp-sdk';
	import { select_value } from 'svelte/internal';
	import { clientGlobalConfigStore, minStakeAetto } from '$lib/stores/clientGlobalConfigStore';
	import AeAmount from './CoinAmount.svelte';
	import stakingContractACI from '$lib/aesdk/stakingContractACI';
	import { connectToWallet, walletConnectionStore } from '$lib/stores/walletConnectionStore';
	import type { Validator } from '../aesdk/contractState';
	import { getValidatorByCt } from '$lib/serverConfig';
	import AmountSlider from './AmountSlider.svelte';

	export let aettoAvailable: bigint = 0n;
	export let validator: Validator;

	$: sdk = $walletConnectionStore.sdk!;
	$: stakingContrAddr = $clientGlobalConfigStore?.stakingContract!;

	$: validatorDesc = getValidatorByCt(validator.ct);
	$: aetto = 0n;
	$: ae = parseFloat(toAe(aetto as any));
	$: outsideRange = aetto < 0n || aetto > aettoAvailable;
	$: spendingAllAe = aetto === aettoAvailable;
	$: belowMinStake = aetto < $minStakeAetto;
	$: btnDisabled = outsideRange || spendingAllAe || belowMinStake || !validatorDesc;

	const changeVal = (aeNew: number) => {
		aetto = BigInt(toAettos(aeNew, { denomination: AE_AMOUNT_FORMATS.AE }));
	};
</script>

<div class="space-y-4">
	<div class="form-control font-bold text-primary">
		<div>
			HCsats amount:
			<label class="label">
				<input type="number" bind:value={aetto} class="input input-bordered w-full" />
			</label>
		</div>
		<div>
			HCcoin amount:
			<label class="label">
				<input
					type="number"
					value={ae}
					class="input input-bordered  w-full"
					on:input={(e) => changeVal(e.target.value)}
				/>
			</label>
		</div>
	</div>
	<AmountSlider amount={aetto} max={aettoAvailable} color="primary" onChange={(a) => (aetto = a)} />
	<div class="flex justify-center  prose p-0 m-0 font-bold text-primary">
		&nbsp;
		{#if outsideRange}
			Amount is outside of allowed range
		{:else if spendingAllAe}
			Trying to spend all AE
		{:else if belowMinStake}
			Amount is below the minimum stake
		{:else if !validatorDesc}
			Validator address not known (should not happen)
		{/if}
	</div>
	<div class="flex  justify-end">
		<button
			class="btn btn-primary w-56 {btnDisabled && 'btn-disabled'}"
			on:click={async () => {
				const stakingContract = await sdk.getContractInstance({
					aci: stakingContractACI,
					contractAddress: stakingContrAddr
				});
				const ret = await stakingContract.methods.stake(validatorDesc?.ak, { amount: aetto });
				console.log('staking result', ret);
				const returnCode = ret.result.returnType;
				console.log('return code:', returnCode);
			}}
			>stake
		</button>
	</div>
</div>
