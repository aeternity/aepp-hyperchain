<script lang="ts">
	export let currentPath: string;
	export let navUrl: string;
	export let text: string;
</script>

<a
	href={navUrl}
	class="btn btn-primary rounded-none no-animation hover:bg-primary-focus/90 hover:text-secondary-content  {currentPath === navUrl
		? 'btn-active border-0 '
		: 'btn-ghost border-0 text-secondary-content'}">{text}</a
>
