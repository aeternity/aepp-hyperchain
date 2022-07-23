<script lang="ts">
  import { browser } from "$app/env";
  import { formatAE, fromJSON } from "../lib/utils";
  import { StateDecodedResult } from "../lib/aesdk/contractState";
  import { getValidatorByAk } from "../lib/serverConfig";
  import ValidatorCard from "$lib/components/ValidatorCard.svelte";

  export var state: string | null;
  const stDecoded = StateDecodedResult.parse(fromJSON(state));

  if (browser) {
    // console.log(stDecoded);
  }

  const currentLeader = getValidatorByAk(stDecoded.leader);
</script>

<div class="xl:container bg-secondary/10 pt-1 pb-2 min-h-full">
  <div class="header rounded-b-box shadow-lg mb-2 ml-2 mr-2 bg-base-100  border-primary/50">
    <div class="card-body p-4 ">
      <div class="flex">
        <span class="flex-auto">Total Stake In Validators: {formatAE(stDecoded.total_stake)}</span>
        <span class="flex-end"> Minimum Stake: {formatAE(stDecoded.stake_minimum)}</span>
      </div>
    </div>
  </div>
  <div class="p-4 space-y-4">
    {#each stDecoded.validators as validator}
      <ValidatorCard validator={validator} currentLeader={currentLeader} displayStakingButton=true />
    {/each}
  </div>
</div>
