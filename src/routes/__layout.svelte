<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import NavBarLink from '$lib/components/NavBarLink.svelte';
	import WalletConnect from '../lib/components/WalletConnect.svelte';
	let currentPath: string;
	$: currentPath = $page.url.pathname;
</script>

<div class="navbar bg-primary text-primary-content mt-0 pt-0.5 pb-0.5 min-h-0">
	<div class="navbar-start space-x-2">
		<a class="btn btn-ghost normal-case text-xl no-animation hover:bg-primary" href="/"
			>[Chain Name Here]</a
		>
		<NavBarLink navUrl="/mypage" text="My Page" {currentPath} />
		<NavBarLink navUrl="/validators" text="Validators" {currentPath} />
	</div>
	<div class="navbar-end"><WalletConnect /></div>
</div>
<div class="container mx-auto">
	<slot />
</div>
