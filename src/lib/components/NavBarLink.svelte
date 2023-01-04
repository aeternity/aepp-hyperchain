<script lang="ts">
	export let currentPath: string;
	export let navUrl: string;
	export let text: string;
</script>

<a
	href={navUrl}
	class="btn btn-secondary rounded-full no-animation hover:bg-secondary-focus text-secondary-content normal-case
  {currentPath === navUrl ? 'btn-active' : 'btn-ghost'}"
>
	{text}
</a>
