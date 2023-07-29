<script lang="ts">
	import {clientGlobalConfigStore, minStakeAetto} from '$lib/stores/clientGlobalConfigStore';
	import AeAmount from './CoinAmount.svelte';
	import stakingContractACI from '$lib/contracts/MainStaking.aci.json';
	import {walletConnectionStore} from '$lib/stores/walletConnectionStore';
	import {sharesToAetto, type Validator} from '../aesdk/contractState';
	import AmountSlider from './AmountSlider.svelte';

	export let sharesInValidator = 0n;
	export let validator: Validator;

	$: sdk = $walletConnectionStore.sdk!;
	$: stakingContrAddr = $clientGlobalConfigStore?.stakingContract;

	$: shares = 0n;
	$: remainder = sharesInValidator - shares;
	$: sharesValue = sharesToAetto(validator, shares);
	$: remainderValue = sharesToAetto(validator, remainder);
	$: outsideRange = shares < 0n || shares > sharesInValidator;
	$: remainderBelowMinStake = remainderValue < $minStakeAetto && remainder != 0n;
	$: btnDisabled = outsideRange || remainderBelowMinStake;

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
						on:input={(e) => (shares = BigInt(e.target?.value || 0))}
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
			{/if}
		</div>
		<div class="flex  justify-end">
			<button
				class="btn btn-secondary w-56 {btnDisabled && 'btn-disabled'}"
				on:click={async () => {
					callState = 'calling';
					const stakingContract = await sdk.initializeContract({
						aci: stakingContractACI,
						address: stakingContrAddr
					});
					const ret = await stakingContract.unstake(validator?.address, shares);
					console.log('unstaking result', ret);
					callState = { code: ret.result.returnType, amount: ret.decodedResult.shares };
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
			<p>Unstaked shares: {callState.amount}</p>
		</div>
	{/if}
</div>
