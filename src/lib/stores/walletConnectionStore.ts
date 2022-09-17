import { get, writable } from 'svelte/store';
import { walletDetector, BrowserWindowMessageConnection } from '@aeternity/aepp-sdk';
import type { AeSdkAepp } from '@aeternity/aepp-sdk';
import type { SUBSCRIPTION_TYPES } from '@aeternity/aepp-sdk';
import { AE_AMOUNT_FORMATS } from '@aeternity/aepp-sdk';
import { z } from 'zod';
import { createBaseAeppIframe } from '$lib/aesdk/walletConnection';
import type { ClientGlobalConfig } from '$lib/ClientGlobalConfig';

const WALLET_INFO_KEY = 'walletInfo';

const WalletInfo = z.object({
	id: z.string(),
	type: z.string(),
	origin: z.string(),
	networkId: z.string(),
	name: z.string()
});
export type WalletInfo = z.infer<typeof WalletInfo>;

export interface Wallet {
	info: WalletInfo;
	getConnection: () => BrowserWindowMessageConnection;
}

export interface WalletConnectionStore {
	walletsFound: Wallet[];
	scans: number;
	scanning: boolean;
	sdk: AeSdkAepp | null;
	detectorDisconnect: null | (() => void);
	connectedWallet: null | { w: Wallet; addr: string; balAETTO: bigint };
}

export const walletConnectionStore = writable<WalletConnectionStore>({
	walletsFound: [],
	scans: 0,
	scanning: false,
	sdk: null,
	detectorDisconnect: null,
	connectedWallet: null
});

export const walletConnectModalOpen = writable<boolean>(false);

export const connectToWallet = async (sdk: AeSdkAepp, wallet: Wallet) => {
	await sdk.connectToWallet(wallet.getConnection());
	const subscribedAddr = await sdk.subscribeAddress(<SUBSCRIPTION_TYPES>'subscribe', 'connected');
	const {
		address: { current }
	} = subscribedAddr;
	const address = Object.keys(current)[0] as `ak_${string}`;
	console.log(`Connected Wallet Address: ${address}`);
	walletConnectModalOpen.set(false);
	const balAETTO = await sdk.getBalance(address, { format: AE_AMOUNT_FORMATS.AETTOS });

	walletConnectionStore.update((s) => {
		if (s.detectorDisconnect) {
			console.log('stopping ongoing scan...');
			s.detectorDisconnect();
		}
		window.localStorage.setItem(WALLET_INFO_KEY, JSON.stringify(wallet.info));
		s.connectedWallet = { w: wallet, addr: address, balAETTO: BigInt(balAETTO) };
		return { ...s, scanning: false, sdk, detectorDisconnect: null, walletsFound: [] };
	});
	return sdk;
};

export const disconnectWallet = async (sdk: AeSdkAepp) => {
	sdk.disconnectWallet();
	walletConnectionStore.update((s) => {
		s.connectedWallet = null;
		return s;
	});
	window.localStorage.removeItem(WALLET_INFO_KEY);
};

export const reconnectToWallet = async (config: ClientGlobalConfig) => {
	const ls = window.localStorage.getItem(WALLET_INFO_KEY);
	if (ls) {
		const oldWalletInfo = JSON.parse(ls);
		console.log('walletInfo in localStorage', oldWalletInfo);
		createBaseAeppIframe(config.wallet);
		const conn = new BrowserWindowMessageConnection({ debug: false });
		walletConnectionStore.update((s) => ({ ...s, scans: s.scans + 1, scanning: true }));
		const detectorDisconnect = walletDetector(conn, async ({ newWallet }) => {
			console.log('newWallet found', newWallet);
			if (newWallet) {
				const wInfo = WalletInfo.parse(newWallet.info);
				if (
					wInfo.name === oldWalletInfo.name &&
					wInfo.networkId === oldWalletInfo.networkId &&
					wInfo.origin === oldWalletInfo.origin &&
					wInfo.type === oldWalletInfo.type
				) {
					const sdk = get(walletConnectionStore).sdk;
					if (sdk) {
						await connectToWallet(sdk, newWallet as Wallet);
					}
				}
			}
		});
		walletConnectionStore.update((s) => {
			return { ...s, detectorDisconnect };
		});
	}
};

export const updateAccountBalance = async () => {
	const store = get(walletConnectionStore);
	if (store.connectedWallet) {
		const address = store.connectedWallet.addr as `ak_${string}`;
		const balAETTO = await store.sdk?.getBalance(address, { format: AE_AMOUNT_FORMATS.AETTOS });
		if (balAETTO) {
			walletConnectionStore.update((s) => {
				if (s.connectedWallet) {
					s.connectedWallet.balAETTO = BigInt(balAETTO);
				}
				return s;
			});
		}
	}
};
