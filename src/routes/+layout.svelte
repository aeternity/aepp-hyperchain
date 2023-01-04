<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { assets } from '$app/paths';
	import NavBarLink from '$lib/components/NavBarLink.svelte';
	import WalletConnect from '../lib/components/WalletConnect.svelte';
	import { onMount } from 'svelte';
	import { reconnectToWallet, walletConnectionStore } from '../lib/stores/walletConnectionStore';
	import { mkSdk } from '../lib/aesdk/walletConnection';
	import { clientGlobalConfigStore, minStakeAetto } from '$lib/stores/clientGlobalConfigStore';
	import { updateStoresRepeatedly } from '$lib/stores/common';
	import type { SvelteToastOptions } from '@zerodevx/svelte-toast';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import type { PageData } from './$types';

	const toastOptions: SvelteToastOptions = { duration: 4000, classes: ['toast', 'toast-bottom'] };

	export let data: PageData;
	$: config = data?.config;

	let currentPath: string;
	$: currentPath = $page.url.pathname;
	// console.log(getStores());
	onMount(() => {
		const sdk = mkSdk(config.node);
		clientGlobalConfigStore.set(config);
		minStakeAetto.set(BigInt(config.minStakeAetto));
		walletConnectionStore.update((s) => ({ ...s, sdk }));
		updateStoresRepeatedly();
		reconnectToWallet(config);
	});
</script>

<div class="min-h-screen">
	<div class="bg-secondary sticky top-0 z-40">
		<div class="navbar bg-secondary text-primary mt-0 pt-3 pb-3 shadow-lg">
			<div class="navbar-start grid grid-cols-1 md:grid-cols-2">
				<a
					class="btn btn-secondary rounded-full normal-case text-xl no-animation p-0 flex space-x-1"
					href="/"
				>
					<span class="lg:hidden">
						<span class="flex space-x-1">
							<img alt="AE Symbol" src="{assets}/ae-symbol.svg" />
							<h1 class="font-light text-primary-content">Hyperchains</h1>
						</span>
					</span>
					<span class="avatar hidden lg:flex m-0 rounded-full ">
						<span class="p-2 pl-3 pr-3 ">
							<img alt="Aeternity Logo" src="{assets}/aeternity-logo-white-font.svg" />
						</span>
						<h1 class="font-light text-primary-content">Hyperchains</h1>
					</span>
				</a>
				<div class="grid grid-cols-2 space-x-1">
					<NavBarLink navUrl="/my-funds" text="My Funds" {currentPath} />
					<NavBarLink navUrl="/validators" text="Validators" {currentPath} />
				</div>
			</div>
			<div class="navbar-end">
				<WalletConnect {config} />
			</div>
		</div>
	</div>
	<div class="">
		<div class="container mx-auto z-10">
			<slot />
		</div>

		<footer class="footer footer-center items-center text-primary p-2 mt-4 ">
			<div class="items-center grid-flow-row">
				<p>
					Copyright © 2022 - <a
						class="link"
						href="https://www.aeternity-foundation.org/"
						target="_blank"
						rel="noreferrer"
					>
						Aeternity Crypto Foundation
					</a>
				</p>
			</div>
		</footer>
	</div>
</div>
<SvelteToast options={toastOptions} />
