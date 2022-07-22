<script lang="ts">
	export let currentPath: string;
	export let navUrl: string;
	export let text: string;
</script>

<a
	href={navUrl}
	class="btn rounded-none no-animation hover:bg-secondary-focus/25  {currentPath === navUrl
		? 'btn-active bg-secondary-focus/25 border-0 text-secondary-content '
		: 'btn-ghost border-0'}">{text}</a
>
