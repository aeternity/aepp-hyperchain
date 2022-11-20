<script lang="ts">
	import type { Wallet } from '../stores/walletConnectionStore';
	import { walletConnectionStore } from '../stores/walletConnectionStore';
	import { connectToWallet, disconnectWallet } from '../stores/walletConnectionStore.js';
	import { detectWallets } from '../aesdk/walletConnection.js';
	import AeAmount from './CoinAmount.svelte';
	import type { ClientGlobalConfig } from '$lib/ClientGlobalConfig';

	export let withBorder = true;
	export let wallet: Wallet;
	export let config: ClientGlobalConfig;
	$: sdk = $walletConnectionStore.sdk;
	$: sameNetwork = wallet.info.networkId === config.networkId;
	$: conn = $walletConnectionStore.connectedWallet;
	$: connectedToWallet =
		conn &&
		wallet.info.origin === conn.w.info.origin &&
		wallet.info.networkId === conn.w.info.networkId;
</script>

<div
	class="card compact border {withBorder ? 'border-secondary border-2 shadow-lg' : 'border-0'}  p-2"
>
	<div class="card-body text-secondary p-1">
		<h4 class="card-title">{wallet.info.name}</h4>
		<div>
			<p>
				type: {wallet.info.type}
				{#if wallet.info.type === 'window' && !connectedToWallet}
					<span class="badge badge-outline badge-warning">Requires pop-ups permission!</span>
				{/if}
			</p>
			<p>
				network:
				<span class="badge badge-outline {sameNetwork ? 'badge-success' : 'badge-ghost'}">
					{wallet.info.networkId}
				</span>
			</p>
			{#if conn}
				<p class="break-all">Address: {conn.addr}</p>
				<p>
					Balance:
					<AeAmount aetto={conn.balAETTO} />
				</p>
			{/if}
		</div>
	</div>
	<div class="card-actions justify-end">
		{#if connectedToWallet}
			<button
				class="btn btn-primary"
				on:click={() => {
					if (sdk) {
						disconnectWallet(sdk);
					}
					detectWallets(config.wallet);
				}}
				>Disconnect
			</button>
		{:else}
			<button
				class="btn btn-secondary"
				disabled={!sameNetwork}
				on:click={() => {
					if (sdk) {
						connectToWallet(sdk, wallet);
					}
				}}
				>connect
			</button>
		{/if}
	</div>
</div>
