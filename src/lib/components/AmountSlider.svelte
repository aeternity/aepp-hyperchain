<script lang="ts">
	export let amount: bigint;
	export let max: bigint;
	export let color: 'primary' | 'secondary';
	export let onChange: (newAmount: bigint) => void;
	$: value = Number((amount * 100n) / (max || 1n));
</script>

<div>
	<input
		type="range"
		min="0"
		{value}
		max={100}
		step={10}
		class="range {color === 'secondary' ? 'range-secondary' : 'range-primary'} range-md"
		on:input={(e) => {
			if (e.target?.value) {
				const newPercent = BigInt(e.target?.value);
				onChange((max * newPercent) / 100n);
			} else {
				console.error('slider value not available... event target is:', e);
			}
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
