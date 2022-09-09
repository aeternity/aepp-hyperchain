import { fetchValidatorsState } from './validatorsSore.js';
import { updateAccountBalance } from './walletConnectionStore.js';

export async function updateStores() {
	await fetchValidatorsState();
	await updateAccountBalance();
}
export async function updateStoresRepeatedly() {
	// console.log('updating state...');
	await updateStores()
		.catch((err) => {
			console.error(`Failed to update stores: ${err}`);
		})
		.finally(() => {
			setTimeout(updateStoresRepeatedly, 5000);
		});
}
