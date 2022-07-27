<script lang="ts">
  import { toAe } from "@aeternity/aepp-sdk";
  import { aettoToAe, humanReadableFormatter } from "../utils.js";
  import { toast } from "@zerodevx/svelte-toast";

  export let aetto: bigint;
  const aeAmount = aettoToAe(aetto);
  const humanReadable = humanReadableFormatter(aeAmount);
  // console.log(humanReadable)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(aeAmount.toString()).then(function() {
      toast.push("Copied to clipboard");
    }, function(err) {
      alert('Could not copy text to clipboard')
    });
  };
</script>

<span class="tooltip tooltip-right tooltip-info" data-tip="Click to copy" on:click={copyToClipboard}>
<span class="mono text-primary font-bold tooltip tooltip-primary tooltip-bottom hover:z-50 hover:cursor-pointer "
      data-tip="{aeAmount}">
  <span class="font-bold">{humanReadable}</span>
  <span class="text-xl pl-1rem text-primary m-0">æ</span>
</span>
</span>
