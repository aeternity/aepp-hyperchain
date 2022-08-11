<script lang="ts">
	import { AeSdk, AE_AMOUNT_FORMATS, toAe, toAettos } from '@aeternity/aepp-sdk';
	import { select_value } from 'svelte/internal';
	import { clientGlobalConfigStore, minStakeAetto } from '$lib/stores/clientGlobalConfigStore';
	import AeAmount from './CoinAmount.svelte';
	import stakingContractACI from '$lib/aesdk/stakingContractACI';
	import { connectToWallet, walletConnectionStore } from '$lib/stores/walletConnectionStore';
	import { sharesToAetto, type Validator } from '../aesdk/contractState';
	import { getValidatorByCt } from '$lib/serverConfig';
	import AmountSlider from './AmountSlider.svelte';

	export let sharesInValidator: bigint = 0n;
	export let validator: Validator;

	$: sdk = $walletConnectionStore.sdk!;
	$: stakingContrAddr = $clientGlobalConfigStore?.stakingContract!;
	$: validatorDesc = getValidatorByCt(validator.ct);

	$: shares = 0n;
	$: remainder = sharesInValidator - shares;
	$: sharesValue = sharesToAetto(validator, shares);
	$: remainderValue = sharesToAetto(validator, remainder);
	$: outsideRange = shares < 0n || shares > sharesInValidator;
	$: remainderBelowMinStake = remainderValue < $minStakeAetto && remainder != 0n;
	$: btnDisabled = outsideRange || remainderBelowMinStake || !validatorDesc;

	let callState: 'input' | 'calling' | { code: string; amount: bigint } = 'input';
</script>

<div class="space-y-4">
	{#if callState === 'input'}
		<div class="form-control font-bold text-secondary">
			<div>
				Shares to unstake:
				<label class="label">
					<input
						type="number"
						value={shares}
						class="input input-bordered w-full"
						on:input={(e) => (shares = BigInt(e.target.value))}
					/>
				</label>
			</div>
			<div>Approximate value: <AeAmount aetto={sharesValue} /></div>
			<div>Remainder: {remainder} shares</div>
			<div>Remainder Value: <AeAmount aetto={remainderValue} /></div>
		</div>
		<AmountSlider
			amount={shares}
			max={sharesInValidator}
			color="secondary"
			onChange={(a) => (shares = a)}
		/>
		<div class="flex justify-center  prose p-0 m-0 font-bold text-secondary">
			&nbsp;
			{#if outsideRange}
				Amount is outside of allowed range
			{:else if remainderBelowMinStake}
				Remainder is below the minimum stake
			{:else if !validatorDesc}
				Validator address not known (should not happen)
			{/if}
		</div>
		<div class="flex  justify-end">
			<button
				class="btn btn-secondary w-56 {btnDisabled && 'btn-disabled'}"
				on:click={async () => {
					callState = 'calling';
					const stakingContract = await sdk.getContractInstance({
						aci: stakingContractACI,
						contractAddress: stakingContrAddr
					});
					const ret = await stakingContract.methods.unstake(validatorDesc?.ak, shares);
					console.log('unstaking result', ret);
					callState = { code: ret.result.returnType, amount: ret.decodedResult };
				}}
				>unstake
			</button>
		</div>
	{:else if callState === 'calling'}
		<div class="flex justify-center items-center">
			<div class="radial-progress animate-spin text-secondary" style="--value:25; --size: 6rem" />
		</div>
	{:else}
		<div class="alert alert-info">
			<p>Return code: {callState.code}</p>
			<p>Return value: {callState.amount}</p>
		</div>
	{/if}
</div>
