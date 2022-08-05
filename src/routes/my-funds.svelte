<script>
	import { getAddrShares, totalStakedForAddr } from '$lib/aesdk/contractState';

	import CoinAmount from '$lib/components/CoinAmount.svelte';
	import StakingCard from '$lib/components/StakingCard.svelte';
	import { validatorsStore } from '$lib/stores/validatorsSore';
	import { walletConnectionStore } from '$lib/stores/walletConnectionStore';
	import { state } from '@aeternity/aepp-sdk/es/channel/internal';
	$: wallet = $walletConnectionStore.connectedWallet;
	$: validators = $validatorsStore;
</script>

<div class="container content-center border items-center">
	<div class="card border m-2 p-2 rounded  shadow max-w-3xl ">
		<div class="card-title"><h2 class="mt-4">My Funds</h2></div>
		<div class="card-body p-3">
			{#if wallet}
				<div class="alert">
					Available in wallet: <CoinAmount aetto={wallet.balAETTO} dropdownReverse />
				</div>
				<div class="space-y-2">
					{#if validators}
						<div class="alert border border-primary">
							Total staked: <CoinAmount
								aetto={totalStakedForAddr(validators, wallet.addr)}
								dropdownReverse
							/>
						</div>
						{#each validators.validators as val (val.ct)}
							{#if getAddrShares(val, wallet.addr)}
								<StakingCard validator={val} />
							{/if}
						{/each}
					{:else}
						Fetching validators state...
					{/if}
				</div>
			{:else}
				<div class="alert alert-warning">Not connected to a wallet</div>
			{/if}
		</div>
	</div>
</div>
