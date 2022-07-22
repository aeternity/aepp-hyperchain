<script lang="ts">
	export let currentPath: string;
	export let navUrl: string;
	export let text: string;
</script>

<a
	href={navUrl}
	class="btn rounded-none no-animation hover:bg-primary-focus {currentPath === navUrl
		? 'btn-active bg-primary-focus border-0 '
		: 'btn-ghost border-0'}">{text}</a
>
