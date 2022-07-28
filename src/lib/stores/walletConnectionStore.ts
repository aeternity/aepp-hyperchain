import { writable } from 'svelte/store';
import type { BrowserWindowMessageConnection } from '@aeternity/aepp-sdk';
import type { AeSdkAepp } from '@aeternity/aepp-sdk';
import type { SUBSCRIPTION_TYPES } from '@aeternity/aepp-sdk';

// TODO remove this type when pull request for making these public from the SDK gets merged
export interface Wallet {
	info: {
		id: string;
		type: string;
		origin: string;
		networkId: string;
		name: string;
	};
	getConnection: () => BrowserWindowMessageConnection;
}

export interface WalletConnectionStore {
	walletsFound: Wallet[];
	scans: number;
	sdk: AeSdkAepp | null;
	detectorDisconnect: null | (() => void);
	connectedWallet: null | { w: Wallet; addr: string };
}

export const walletConnectionStore = writable<WalletConnectionStore>({
	walletsFound: [],
	scans: 0,
	sdk: null,
	detectorDisconnect: null,
	connectedWallet: null
});

export const connectToWallet = async (sdk: AeSdkAepp, wallet: Wallet) => {
	const conn = await sdk.connectToWallet(await wallet.getConnection());
	console.log('connection', conn);
	const {
		address: { current }
	} = await sdk.subscribeAddress(<SUBSCRIPTION_TYPES>'subscribe', 'connected');
	const address = Object.keys(current)[0];
	console.log(`Connected Wallet Address: ${address}`);
	walletConnectionStore.update((s) => {
		if (s.detectorDisconnect) {
			console.log('stopping ongoing scan...');
			s.detectorDisconnect();
		}
		s.connectedWallet = { w: wallet, addr: address };
		s.detectorDisconnect = null;
		s.walletsFound = [];
		return s;
	});
};

export const disconnectWallet = async (sdk: AeSdkAepp, wallet: Wallet) => {
	sdk.disconnectWallet();
	walletConnectionStore.update((s) => {
		s.connectedWallet = null;
		return s;
	});
};
