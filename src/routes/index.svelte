<script>
	import DocumentationLink from '$lib/components/DocumentationLink.svelte';
</script>

<div class="container mt-8">
	<div class="prose prose-3xl mb-8">
		<h1 class="font-light">Hyperchains Alpha Network</h1>
		<ul>
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
			Hyperchains are the next incarnation of the Aeternity network. This is an Alpha Hyper (child)
			chain aimed at showing what's possible with hyperchains. The tokens here are called <span
				class="badge badge-outline badge-primary font-bold">HCtokens</span
			>
			with the smallest unit called
			<span class="badge badge-outline badge-primary font-bold">HCsats</span>. They have no economic
			connection to the main AE chain, but technically follow the same structure.
		</p>
		<p>
			<a sveltekit:prefetch href="/validators">
				<button class="btn btn-secondary rounded-full">go to the validators page</button>
			</a>
		</p>
	</div>
</div>
