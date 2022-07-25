<script lang="ts">
  import type { GlobalConfig } from "../../routes/config";

  export let config: GlobalConfig;
  let connectionState: null | "inProgress" = null;
  let modalOpen = false;
</script>

<div>
  <button class="btn btn-secondary rounded-full border-neutral no-animation " on:click={() => modalOpen=true}>Connect</button>

  <div class="modal {modalOpen && 'modal-open'}">
    <div class="modal-box max-w-3xl p-12">
      <button on:click={() => {modalOpen=false; connectionState=null}}
              class="btn btn-sm btn-circle absolute right-2 top-2">✕
      </button>
      {#if connectionState === null}
        <div class="bg-base-100">
          <div class="alert bg-accent/20 mb-2">
          <div class="prose">
            <p>In order to test the functionality you need a special, hyperchains enabled
              <a class="link link-primary" href="{config.wallet}" target="_blank">Wallet</a>. Have it open in another
              tab before you click 'connect'. You can also use this
              <a class="link link-primary" href="{config.faucet}" target="_blank">Faucet</a> to fund your acount.
            </p>
          </div>
          </div>
          <div class="">
            <button class="btn btn-sm btn-secondary flex-end" on:click={() => connectionState='inProgress'}>Connect
            </button>
          </div>
        </div>
      {:else }
        <div class="text-secondary">
          <h3 class="font-bold text-lg">Wallet connection in progress...</h3>
          <div class="flex justify-center items-center">
            <div class="radial-progress animate-spin" style="--value:25"></div>
          </div>
          <p class="py-4">Currently trying to connect. Go to your wallet tab and approve the operation!</p>
        </div>
      {/if}
    </div>
  </div>
</div>
