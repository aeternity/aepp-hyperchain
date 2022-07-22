import { AeSdk, generateKeyPair, MemoryAccount, Node } from '@aeternity/aepp-sdk';
import type { ContractInstance } from '@aeternity/aepp-sdk/es/contract/aci';
import aci from './stakingContractACI';

export interface SdkInstance {
	keypair: ReturnType<typeof generateKeyPair>;
	senderAccount: MemoryAccount;
	node: Node;
	aeSdk: AeSdk;
	stakingContract: ContractInstance;
}

export const mkSdkInstance = async (
	nodeUrl: string,
	stakingContractAddress: string
): Promise<SdkInstance> => {
	const keypair = generateKeyPair();
	const senderAccount = new MemoryAccount({ keypair });
	const node = new Node(nodeUrl, { ignoreVersion: true });
	const aeSdk = new AeSdk({
		nodes: [{ name: 'hc-alpha', instance: node }]
	});
	await aeSdk.addAccount(senderAccount, { select: true });
	console.log('node url', nodeUrl);
	console.log('staking address', stakingContractAddress);
	const stakingContract = await aeSdk.getContractInstance({
		aci: aci,
		contractAddress: stakingContractAddress
	});
	return { keypair, senderAccount, node, aeSdk, stakingContract };
};
