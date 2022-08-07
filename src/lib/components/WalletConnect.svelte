<script lang="ts">
	import { clientGlobalConfigStore } from '$lib/stores/clientGlobalConfigStore';
	import type { ClientGlobalConfig } from '../../routes/config';
	import { detectWallets, mkSdk } from '../aesdk/walletConnection.js';
	import {
		walletConnectionStore,
		walletConnectModalOpen
	} from '../stores/walletConnectionStore.js';
	import AeAmount from './CoinAmount.svelte';
	import WalletCard from './WalletCard.svelte';

	export let config: ClientGlobalConfig;

	$: scanning = $walletConnectionStore.scanning;
	$: wallets = $walletConnectionStore.walletsFound;
	$: conn = $walletConnectionStore.connectedWallet;

	const closeScanner = () => {
		if (scanning) {
			if ($walletConnectionStore.detectorDisconnect) {
				$walletConnectionStore.detectorDisconnect();
			}
			walletConnectionStore.update((s) => ({ ...s, detectorDisconnect: null, scanning: false }));

			walletConnectModalOpen.set(false);
		}
	};
</script>

<div>
	<button
		class="btn btn-secondary rounded-full border-neutral no-animation {conn ? 'normal-case' : ''} "
		on:click={() => {
			walletConnectModalOpen.set(true);
			if (!conn?.addr && !scanning) {
				detectWallets(config.wallet);
			}
		}}
	>
		{#if $walletConnectionStore.scanning}
			<div
				class="radial-progress animate-spin text-secondary-content"
				style="--value:25; --size: 2rem"
			/>
		{:else}
			{conn?.addr
				? conn.addr.slice(0, 8) + '...' + conn.addr.slice(conn.addr.length - 8)
				: 'Connect'}
		{/if}
	</button>

	<div
		class="modal {$walletConnectModalOpen && 'modal-open'}"
		on:click={() => walletConnectModalOpen.set(false)}
	>
		<div class="modal-box max-w-5xl p-8" on:click|stopPropagation>
			<button
				on:click={() => walletConnectModalOpen.set(false)}
				class="btn btn-sm btn-circle btn-secondary absolute right-1 top-1"
				>✕
			</button>
			<div>
				{#if !conn}
					<div class="bg-base-100">
						<div class="alert bg-secondary mb-2">
							<div class="flex flex-col justify-start prose text-secondary-content max-w-5xl">
								<div>
									You need a special instance of
									<a class="link link-primary" href={config.wallet} target="_blank">Base Aepp</a>
									open in another tab. Or you can manually configure the SuperHero extension to connect
									to this network. You can also use this
									<a class="link link-primary" href={config.faucet} target="_blank">Faucet</a> to fund
									your acount.
								</div>
								<div>
									Network ID: <span class="text-primary badge badge-outline"
										>{config.networkId}</span
									>
								</div>
								<div>
									Node URL: <span class="text-primary badge badge-outline">{config.node}</span>
								</div>
							</div>
						</div>
						<div class="prose">
							<h3>
								{wallets.length ? `${wallets.length} wallets found...` : 'Scanning for wallets...'}
							</h3>
						</div>
						<div class="flex flex-row space-x-2 mb-1">
							{#each wallets as wallet}
								{#key wallet.info.id}
									<div class="w-1/2">
										<WalletCard {wallet} {config} />
									</div>
								{/key}
							{/each}
						</div>
						<div class="flex justify-center items-center">
							<div
								class="radial-progress animate-spin text-secondary"
								style="--value:25; --size: 2rem"
							/>
						</div>
					</div>
				{:else}
					<div class="text-secondary">
						<WalletCard wallet={conn.w} {config} withBorder={false} />
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
