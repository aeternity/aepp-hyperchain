<script lang="ts">
  import type { ClientGlobalConfig } from "../../routes/config";
  import { AeSdkAepp, BrowserWindowMessageConnection, Node, walletDetector } from "@aeternity/aepp-sdk";
  import { browser } from "$app/env";
  import { detectWallets, mkSdk } from "../aesdk/walletConnection.js";
  import {  walletConnectionStore } from "../stores/walletConnectionStore.js";
  import type {WalletConnectionStore} from "$lib/stores/walletConnectionStore"
  import WalletCard from "./WalletCard.svelte";
  import { onMount } from "svelte";

  export let config: ClientGlobalConfig;

  let wallets = [];
  let conn: WalletConnectionStore["connectedWallet"] = null;
  walletConnectionStore.subscribe((s) => {
    console.log("Wallet connection store", s);
    wallets = s.walletsFound;
    conn= s.connectedWallet;
  });

  let modalOpen = false;
</script>

<div>
  <button class="btn btn-secondary rounded-full border-neutral no-animation {conn ? 'normal-case' : ''} "
          on:click={() => {modalOpen=true; detectWallets(config.wallet)}}>
    {conn?.addr? conn.addr.slice(0,8) + '...' + conn.addr.slice(conn.addr.length-8) : 'Connect'}
  </button>

  <div class="modal {modalOpen && 'modal-open'}">
    <div class="modal-box max-w-3xl p-8">
      <button on:click={() => {modalOpen=false;}}
              class="btn btn-sm btn-circle absolute right-2 top-2">✕
      </button>
      {#if !conn}
        <div class="bg-base-100">
          <div class="alert bg-secondary mb-2">
            <div class="flex flex-col justify-start prose text-secondary-content">
              <div>You need a special instance of
                <a class="link link-primary" href="{config.wallet}" target="_blank">Base Aepp</a> open in another tab.
                Or you can manually configure the SuperHero extension to connect to this network.
              </div>
              <div>
                Network ID: <span class="text-primary badge badge-outline">{config.networkId}</span>
              </div>
              <div>
                Node URL: <span class="text-primary badge badge-outline">{config.node}</span>
              </div>
              <div>
                You can also use this
                <a class="link link-primary" href="{config.faucet}" target="_blank">Faucet</a> to fund your acount.
              </div>
            </div>
          </div>
          <div class="prose"><h3>{wallets.length ? `${wallets.length} wallets found...` : 'Scanning for wallets...'}</h3></div>
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
            <div class="radial-progress animate-spin text-secondary" style="--value:25; --size: 2rem"></div>
          </div>
        </div>
      {:else }
        <div class="text-secondary">
          <WalletCard wallet={conn.w} {config} withBorder={false} />
        </div>
      {/if}
    </div>
  </div>
</div>
