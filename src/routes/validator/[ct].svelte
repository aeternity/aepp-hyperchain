<script lang="ts">
  import { browser } from "$app/env";
  import { page } from "$app/stores";
  import { StateDecodedResult } from "../../lib/aesdk/contractState";
  import { formatAE, fromJSON } from "../../lib/utils";
  import ValidatorCard from "../../lib/components/ValidatorCard.svelte";
  import { getValidatorByAk, getValidatorByCt } from "../../lib/serverConfig";


  export var state: string | null;
  const ct: string = $page.params["ct"];
  const stDecoded = StateDecodedResult.parse(fromJSON(state));
  if(browser){
    // console.log(stDecoded)
  }
  const currentLeader = getValidatorByAk(stDecoded.leader);
  const validator = stDecoded.validators.find((v) => v.ct == ct)
</script>

<div class="container bg-neutral p-4 space-y-4">
  <ValidatorCard {validator} {currentLeader} />
  <div>
    <button class="btn btn-primary">Stake</button>
    <button class="btn btn-secondary">Unstake</button>
  </div>
  <div class="space-y-2 container mx-auto ">
    <div class="prose">
      <h2>Delegators</h2>
    </div>
    {#each Object.entries(validator.state.delegates) as [del, amount], i}
      <div class="navbar rounded-md bg-base-100 p-2">
        <div class="navbar-start">
          {del}
        </div>
        <div class="navbar-end">
          <p> amount: {formatAE(amount)}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
