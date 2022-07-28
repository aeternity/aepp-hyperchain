import {
	AeSdkAepp,
	BrowserWindowMessageConnection,
	Node,
	walletDetector
} from '@aeternity/aepp-sdk';
import { walletConnectionStore } from '../stores/walletConnectionStore';

export const mkSdk = (node: string) =>
	new AeSdkAepp({
		name: 'Aepp HC',
		nodes: [
			{
				name: 'HC Node',
				instance: new Node(node)
			}
		],
		// compilerUrl: "",
		onDisconnect: (d) => {
			console.log('disconnected', d);
		},
		onAddressChange: (a) => {
			console.log('address changed to', a);
		},
		onNetworkChange: ({ networkId }) => {
			console.log('network changed to', networkId);
		}
	});

export const detectWallets = async (walletUrl: string) => {
	createBaseAeppIframe(walletUrl);
	const conn = new BrowserWindowMessageConnection({ debug: false });
	// console.log('sdk is', conn);
	walletConnectionStore.update((s) => ({ ...s, scans: s.scans + 1 }));
	const detector = walletDetector(conn, ({ wallets, newWallet }) => {
		const foundWallets = Object.values(wallets).map((w) => w) as any;
		// console.log('found wallets', foundWallets);
		walletConnectionStore.update((s) => {
			s.walletsFound = foundWallets;
			return s;
		});
	});
	walletConnectionStore.update((s) => {
		s.detectorDisconnect = detector;
		return s;
	});
};

const iframeId = 'base-aepp-iframe';
export const createBaseAeppIframe = (walletUrl: string): HTMLElement => {
	const found = document.getElementById(iframeId);
	if (found) {
		found.remove();
	}
	const reverseIframe = document.createElement('iframe');
	reverseIframe.src = walletUrl;
	reverseIframe.style.display = 'none';
	reverseIframe.id = iframeId;
	document.body.appendChild(reverseIframe);
	return reverseIframe;
};
