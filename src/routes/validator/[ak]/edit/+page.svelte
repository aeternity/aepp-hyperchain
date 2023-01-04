<script lang="ts">
	import { getValidatorByAk } from '$lib/aesdk/contractState';
	import { page } from '$app/stores';
	import { validatorsStore } from '$lib/stores/validatorsSore';
	import { walletConnectionStore } from '$lib/stores/walletConnectionStore';
	import type { ValidatorPropCalls } from '$lib/aesdk/mainStaking';
	import EditValidatorProperty from '$lib/components/EditValidatorProperty.svelte';
	import Fa from 'svelte-fa';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';

	const ak: string = $page.params['ak'];

	$: sdk = $walletConnectionStore.sdk;
	$: acc = $walletConnectionStore.connectedWallet?.addr;
	$: validator = $validatorsStore ? getValidatorByAk($validatorsStore.st.validators, ak) : null;

	let validatorPropCall: ValidatorPropCalls | null = null;
	let previousValue = '';

	function escClose(k: KeyboardEvent) {
		if (k.code === 'Escape') {
			validatorPropCall = null;
		}
	}
</script>

<div>
	<div>
		<div class="prose mt-2 mb-4">
			<h1 class=" font-light">Edit Validator</h1>
		</div>
		{#if validator && acc && sdk}
			{#if !!validatorPropCall}
				<div
					class="modal {!!validatorPropCall && 'modal-open'}"
					on:click={() => (validatorPropCall = null)}
					on:keydown={escClose}
				>
					<div class="modal-box max-w-3xl" on:click|stopPropagation on:keydown={escClose}>
						<button
							on:click={() => (validatorPropCall = null)}
							class="btn btn-sm btn-circle btn-secondary absolute right-1 top-1"
							>✕
						</button>
						<div>
							<EditValidatorProperty
								{sdk}
								contractMethod={validatorPropCall}
								{previousValue}
								closeWindow={() => (validatorPropCall = null)}
							/>
						</div>
					</div>
				</div>
			{/if}
			<div class="space-y-4">
				<div class="card border border-primary shadow-lg p-4">
					<div class="card-title underline font-light">Avatar</div>
					<div class="card-body p-1">
						<div class="flex space-x-4">
							<div class="w-16">
								<img src={validator.state.image_url} alt="Validator Avatar" />
							</div>
							<div>
								Current:
								<span class="alert p-2 rounded-md">
									{validator.state.image_url}
								</span>
							</div>
							<button
								class="btn btn-secondary btn-outline rounded-full btn-sm"
								on:click={() => {
									validatorPropCall = 'set_validator_avatar_url';
									previousValue = validator?.state.image_url || '';
								}}
							>
								edit <Fa class="ml-2" icon={faEdit} size="lg" />
							</button>
						</div>
						<div class="card-actions" />
					</div>
				</div>
				<div class="card border border-primary shadow-lg p-4">
					<div class="card-title underline font-light">Name</div>
					<div class="card-body p-1">
						<div class="flex space-x-4">
							<div>
								{validator.state.name}
							</div>
							<button
								class="btn btn-secondary btn-outline rounded-full btn-sm"
								on:click={() => {
									validatorPropCall = 'set_validator_name';
									previousValue = validator?.state.name || '';
								}}>edit <Fa class="ml-2" icon={faEdit} size="lg" /></button
							>
						</div>
					</div>
				</div>
				<div class="card border border-primary shadow-lg p-4">
					<div class="card-title underline font-light">Description</div>
					<div class="card-body p-1">
						<div class="flex space-x-4">
							<div>
								{validator.state.description}
							</div>
							<button
								class="btn btn-secondary btn-outline rounded-full btn-sm"
								on:click={() => {
									validatorPropCall = 'set_validator_description';
									previousValue = validator?.state.description || '';
								}}>edit <Fa class="ml-2" icon={faEdit} size="lg" /></button
							>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<progress class="progress progress-primary w-96" />
		{/if}
	</div>
</div>
