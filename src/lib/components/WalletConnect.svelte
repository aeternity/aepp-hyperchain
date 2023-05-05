<script lang="ts">
	import type {ClientGlobalConfig} from '$lib/ClientGlobalConfig.js';
	import {detectWallets} from '../aesdk/walletConnection.js';
	import {walletConnectionStore, walletConnectModalOpen} from '../stores/walletConnectionStore.js';
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
		}
		walletConnectModalOpen.set(false);
	};
	const escClose = (k: KeyboardEvent) => {
		if (k.code === 'Escape') {
			closeScanner();
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
		on:click={closeScanner}
		on:keypress={escClose}
	>
		<div class="modal-box max-w-5xl p-1 md:p-8" on:click|stopPropagation on:keypress={escClose}>
			<button
				on:click={closeScanner}
				class="btn btn-sm btn-circle btn-secondary absolute right-1 top-1"
				>✕
			</button>
			<div>
				<div class="bg-base-100">
					<div class="alert bg-secondary mb-2">
						<div class="flex flex-col justify-start prose text-secondary-content max-w-5xl w-full">
							<div>
								You need  to configure your wallet to connect to this HyperChain network.
								You can do that in
								<a class="link link-primary" href={config.wallet} target="_blank" rel="noreferrer"
									>Base Aepp</a
								>
								open in another tab or the SuperHero extension.

								{#if config.faucet}
									<br />
									You can also use this
									<a class="link link-primary" href={config.faucet} target="_blank" rel="noreferrer"
									>Faucet</a
									> to fund your acount.
								{/if}
							</div>
							<div>
								Network ID: <span class="text-primary badge badge-outline">{config.networkId}</span>
							</div>
							<div>
								Node URL: <span class="text-primary badge badge-outline">{config.node}</span>
							</div>
						</div>
					</div>
					{#if !conn}
						<div class="prose">
							<h3>
								{wallets.length ? `${wallets.length} wallets found...` : 'Scanning for wallets...'}
							</h3>
						</div>
						<div class="grid grid-rows-1 md:grid-rows-2 space-y-1 mb-1">
							{#each wallets as wallet}
								{#key wallet.info.id}
									<WalletCard {wallet} {config} />
								{/key}
							{/each}
						</div>
						<div class="flex justify-center items-center">
							<div
								class="radial-progress animate-spin text-secondary"
								style="--value:25; --size: 2rem"
							/>
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
</div>
