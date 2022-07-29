<script lang="ts">
  import { browser } from "$app/env";
  import { page } from "$app/stores";
  import { getAddrShares, getSharePrice, StateDecodedResult } from "../../lib/aesdk/contractState";
  import { fromJSON } from "../../lib/utils";
  import ValidatorCard from "../../lib/components/ValidatorCard.svelte";
  import { getValidatorByAk, getValidatorByCt } from "../../lib/serverConfig";
  import AeAmount from "../../lib/components/AeAmount.svelte";
  import { walletConnectionStore } from "../../lib/stores/walletConnectionStore";


  export var state: string | null;
  const ct: string = $page.params["ct"];
  const stDecoded = StateDecodedResult.parse(fromJSON(state));
  if (browser) {
    // console.log(stDecoded)
  }
  const currentLeader = getValidatorByAk(stDecoded.leader);
  const validator = stDecoded.validators.find((v) => v.ct == ct);
  const sharePrice = getSharePrice(validator);
  const myAddr = $walletConnectionStore.connectedWallet?.addr;
  const myShares = getAddrShares(validator, myAddr) || 0n;
</script>

<div class="container bg-neutral p-4 space-y-4">
  <ValidatorCard {validator} {currentLeader} />
  <div class="card p-2 shadow-xl bg-base-100">
    <div class="card-body">
      <p>
      Your stake: {myShares} shares, <AeAmount aetto={myShares * sharePrice} />
      </p>
    </div>
    <div class="card-actions align-middle">
    <button class="btn btn-primary">Stake</button>
    <button class="btn btn-secondary">Unstake</button>
    </div>
  </div>
  <div class="container mx-auto ">
    <div class="prose">
      <h2>Delegators</h2>
    </div>
    <div class="space-y-2 max-w-5xl">
      {#each Object.entries(validator.state.delegates) as [del, amount], i}
        <div class="navbar rounded-md bg-base-100 p-2">
          <div class="navbar-start ">
            <div>{del}</div>
          </div>
          <div class="navbar-end space-x-2">
            <div class="border rounded-md p-1">{amount} shares</div>
            <AeAmount aetto={amount * sharePrice } dropdownReverse />
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
