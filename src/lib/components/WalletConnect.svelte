<script lang="ts">
	export let dropdownAlignment: 'dropdown-start' | 'dropdown-end' = 'dropdown-end';
</script>

<div class="dropdown {dropdownAlignment}">
	<button class="btn btn-sm btn-secondary rounded-full no-animation">Connect</button>
	<div class="dropdown-content container mx-auto rounded-box bg-base-100 p-2 w-52 shadow">
		<p>Dropdown</p>
		<button class="btn btn-sm btn-accent">Disconnect</button>
	</div>
</div>
