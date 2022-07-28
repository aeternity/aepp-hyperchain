<script lang="ts">
  import type { Wallet } from "../stores/walletConnectionStore";
  import type { ClientGlobalConfig } from "../../routes/config";
  import { fade } from "svelte/transition";
  import { walletConnectionStore } from "../stores/walletConnectionStore";
  import { connectToWallet, disconnectWallet } from "../stores/walletConnectionStore.js";
  import { detectWallets } from "../aesdk/walletConnection.js";

  export let withBorder = true;
  export let wallet: Wallet;
  export let config: ClientGlobalConfig;
  let sdk = $walletConnectionStore.sdk;
  let sameNetwork = wallet.info.networkId === config.networkId;
  let conn = $walletConnectionStore.connectedWallet;
  let connectedToWallet = conn &&
    wallet.info.origin === conn.w.info.origin &&
    wallet.info.networkId === conn.w.info.networkId;
</script>

<div class="card border {withBorder ? 'border-secondary border-2 shadow-lg': 'border-0' }  p-2">
  <div class="card-body text-secondary">
    <h4 class="card-title">{wallet.info.name}</h4>
    <p>type: {wallet.info.type}</p>
    <p>network: <span class="badge badge-outline {sameNetwork ? 'badge-success' : 'badge-ghost'}">{wallet.info.networkId}</span>
    </p>
    {#if (connectedToWallet)}
      <p>Address: {conn.addr}</p>
    {/if}
  </div>
  <div class="card-actions justify-end">
    {#if (connectedToWallet)}
      <button class="btn btn-primary" on:click={() => {disconnectWallet(sdk, wallet);
        detectWallets(config.wallet)}}>Disconnect</button>
    {:else}
      <button class="btn btn-secondary" disabled={!sameNetwork}
              on:click={() => connectToWallet(sdk, wallet)}>connect
      </button>
    {/if}
  </div>
</div>
