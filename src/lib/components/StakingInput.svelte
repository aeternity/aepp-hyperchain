<script lang="ts">
	import { AE_AMOUNT_FORMATS, toAe, toAettos } from '@aeternity/aepp-sdk';
	import { select_value } from 'svelte/internal';
	import { clientGlobalConfigStore, minStakeAetto } from '$lib/stores/clientGlobalConfigStore';
	import AeAmount from './AeAmount.svelte';

	export let action: 'STAKE' | 'UNSTAKE';
	export let aettoAvailable: bigint = 0n;
	$: aeAvailable = parseFloat(toAe(aettoAvailable as any));
	$: aetto = 0n;
	$: ae = parseFloat(toAe(aetto as any));
	$: outsideRange = aetto < 0n || aetto > aettoAvailable;
	$: inputClass = outsideRange ? 'input-error' : 'input-secondary';
	$: spendingAllAe = aetto === aettoAvailable && action === 'STAKE';
	$: belowMinStake = aetto < $minStakeAetto;
	$: btnDisabled = outsideRange || spendingAllAe || belowMinStake;

	console.log('clientGlobalConfig', $clientGlobalConfigStore);

	const changeVal = ({ aeNew, aettoNew }: { aeNew?: number; aettoNew?: bigint }) => {
		if (aettoNew) {
			aetto = aettoNew;
		} else if (aeNew) {
			aetto = BigInt(toAettos(aeNew, { denomination: AE_AMOUNT_FORMATS.AE }));
		}
	};
</script>

<div class="space-y-4">
	<div class="form-control font-bold text-primary">
		<div>
			aetto amount:
			<label class="label">
				<input type="number" bind:value={aetto} class="input input-bordered w-full {inputClass}" />
			</label>
		</div>
		<div>
			ae amount:
			<label class="label">
				<input
					type="number"
					value={ae}
					class="input input-bordered  w-full {inputClass}"
					on:input={(e) => changeVal({ aeNew: e.target.value })}
				/>
			</label>
		</div>
	</div>
	<div>
		<input
			type="range"
			min="0"
			value={ae}
			max={aeAvailable}
			step={aeAvailable / 10}
			class="range range-primary range-md"
			on:input={(e) => {
				const aeNew = e.target.value;
				// console.log('ae value', aeNew);
				changeVal({ aeNew });
			}}
		/>
		<div class="w-full flex justify-between text-xs px-2">
			<span>0%</span>
			<span>10%</span>
			<span>20%</span>
			<span>30%</span>
			<span>40%</span>
			<span>50%</span>
			<span>60%</span>
			<span>70%</span>
			<span>80%</span>
			<span>90%</span>
			<span>100%</span>
		</div>
	</div>
	<div class="flex justify-center  prose p-0 m-0 font-bold text-primary">
		&nbsp;
		{#if outsideRange}
			Amount is outside of allowed range
		{:else if spendingAllAe}
			Trying to spend all AE
		{:else if belowMinStake}
			Amount is below the minimum stake
		{/if}
	</div>
	<div class="flex  justify-end">
		<button
			class="btn btn-primary w-56 {btnDisabled && 'btn-disabled'}"
			on:click={() => console.log('clicked submit')}
			>{action}
		</button>
	</div>
</div>
