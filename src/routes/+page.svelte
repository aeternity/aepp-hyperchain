<script>
	import { getValidatorByAk } from '$lib/aesdk/contractState';

	import DocumentationLink from '$lib/components/DocumentationLink.svelte';
	import { validatorsStore } from '$lib/stores/validatorsSore';
	$: st = $validatorsStore;
	$: leader = st ? getValidatorByAk(st.st.validators, st.hcElection.leader) : null;
</script>

<div class="container mt-8 p-1">
	<div class="prose prose-3xl mb-8">
		<h1 class="font-light">Hyper Chain 0.2</h1>
		<ul class="space-y-4">
			<li>
				<DocumentationLink
					text="Hyperchains FAQ thread"
					url="https://forum.aeternity.com/t/hyperchains-faq/7629"
				/>
			</li>
			<li class="space-x-1">
				<DocumentationLink
					text="Hyperchains Whitepaper"
					url="https://forum.aeternity.com/t/hyperchains-whitepaper-is-released/7812"
				/>
				<DocumentationLink
					text="Github"
					url="https://github.com/aeternity/hyperchains-whitepaper"
				/>
			</li>
			<li>
				<DocumentationLink
					text="Hyperchains Alpha Dev Diary Thread"
					url="https://forum.aeternity.com/t/hyperchains-alpha/10192"
				/>
			</li>
			<li>
				<DocumentationLink
					text="ACF Medium"
					url="https://aeternity-crypto-foundation.medium.com/"
				/>
			</li>
		</ul>
		<p>
			Hyperchains are the next incarnation of the Aeternity network. This is a hyper (child) chain
			aimed at showing what's possible with hyperchains. The tokens here are called <span
				class="badge badge-outline badge-primary font-bold">HCtokens</span
			>
			with the smallest unit called
			<span class="badge badge-outline badge-primary font-bold">HCsats</span>. They have no economic
			connection to the main AE chain, but technically follow the same structure.
		</p>
		<p>
			<a data-sveltekit-prefetch href="/validators">
				<button class="btn btn-secondary rounded-full">go to the validators page</button>
			</a>
		</p>
	</div>
	{#if st}
		<div class="card border border-primary">
			<div class="card-body p-4">
				<div class=" card-title"><h3>Stats</h3></div>
				<p>Block Height: {st.height}</p>
				<p class="break-all">Entropy String: {st.hcElection.entropy}</p>
				<p>
					Current Leader: <a class="link link-primary" href={`/validator/${leader?.address}`}>
						{leader?.state.name}</a
					>
				</p>
			</div>
		</div>
	{:else}
		<progress class="progress progress-primary w-96" />
	{/if}
</div>
