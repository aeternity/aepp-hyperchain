<script lang="ts">
	import { aettoToAe, humanReadableFormatter } from '../utils.js';

	export let aetto: bigint;
	export let dropdownReverse = false;
	$: aeAmount = aettoToAe(aetto);
	$: humanReadable = humanReadableFormatter(aeAmount);
</script>

<span
	class="mono text-primary font-bold hover:z-50 dropdown dropdown-hover {dropdownReverse &&
		'dropdown-end'}"
	data-tip={aeAmount}
>
	<label tabindex="0">
		<span class="font-bold">{humanReadable}</span>
		<span class="pl-1rem text-primary m-0 font-light">HCcoin</span>
	</label>
	<ul
		tabindex="0"
		class="dropdown-content menu p-2 pl-3 shadow-lg bg-base-100 rounded-box w-80 font-normal border"
	>
		<li>{aeAmount} HCcoin</li>
		<li>{aetto} HCsats</li>
	</ul>
</span>
