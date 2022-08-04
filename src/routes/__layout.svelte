<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import type { SvelteToastOptions } from '@zerodevx/svelte-toast';

	const toastOptions: SvelteToastOptions = { duration: 4000, classes: ['toast', 'toast-bottom'] };

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const response = await fetch('/config');
		const jsonResp = response.ok ? await response.json() : null;
		return {
			status: response.status,
			props: {
				config: jsonResp || undefined
			}
		};
	};
</script>

<script lang="ts">
	import '../app.css';
	import { page, getStores } from '$app/stores';
	import { assets } from '$app/paths';
	import NavBarLink from '$lib/components/NavBarLink.svelte';
	import WalletConnect from '../lib/components/WalletConnect.svelte';
	import { onMount } from 'svelte';
	import { reconnectToWallet, walletConnectionStore } from '../lib/stores/walletConnectionStore';
	import { mkSdk } from '../lib/aesdk/walletConnection';
	import type { ClientGlobalConfig } from './config';
	import { clientGlobalConfigStore, minStakeAetto } from '$lib/stores/clientGlobalConfigStore';
	import stakingContractACI from '$lib/aesdk/stakingContractACI';
	import { ContractError } from '@aeternity/aepp-sdk';

	export let config: ClientGlobalConfig;
	let currentPath: string;
	$: currentPath = $page.url.pathname;
	// console.log(getStores());
	onMount(async () => {
		const sdk = await mkSdk(config.node);
		clientGlobalConfigStore.set(config);
		minStakeAetto.set(BigInt(config.minStakeAetto));
		walletConnectionStore.update((s) => {
			s.sdk = sdk;
			return s;
		});
		reconnectToWallet(config);
	});
</script>

<div class="min-h-screen">
	<div class="bg-secondary sticky top-0 z-40">
		<div class="navbar bg-secondary text-primary mt-0 pt-3 pb-3 shadow-lg">
			<div class="navbar-start">
				<a class="btn btn-secondary rounded-full normal-case text-xl no-animation" href="/">
					<span class="avatar  m-0 p-2 pl-3 pr-3 rounded-full ">
						<span class="">
							<img alt="Aeternity Logo" src="{assets}/aeternity-logo-white-font.svg" />
						</span>
					</span>
					<h1 class="font-light text-primary-content">Hyperchains Demo</h1>
				</a>
			</div>
			<div class="navbar-center space-x-1">
				<NavBarLink navUrl="/my-funds" text="My Funds" {currentPath} />
				<NavBarLink navUrl="/validators" text="Validators" {currentPath} />
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
					>
						Aeternity Crypto Foundation
					</a>
				</p>
			</div>
		</footer>
	</div>
</div>
<SvelteToast options={toastOptions} />
