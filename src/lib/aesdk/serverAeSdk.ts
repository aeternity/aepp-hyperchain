import { AeSdk, generateKeyPair, MemoryAccount, Node } from '@aeternity/aepp-sdk';
import type { ContractInstance } from '@aeternity/aepp-sdk/es/contract/aci';
import msACI from '../contracts/MainStaking.aci.json';
import hceACI from '../contracts/HCElection.aci.json';

export interface SdkInstance {
	keypair: ReturnType<typeof generateKeyPair>;
	senderAccount: MemoryAccount;
	node: Node;
	aeSdk: AeSdk;
	stakingContract: ContractInstance;
	hcElectionContract: ContractInstance;
}

export const mkSdkInstance = async (
	nodeUrl: string,
	mainStakingAddress: string,
	hcElectionAddress: string
): Promise<SdkInstance> => {
	const keypair = generateKeyPair();
	// console.log('keypair', keypair);
	const senderAccount = new MemoryAccount(keypair.secretKey);
	const node = new Node(nodeUrl, { ignoreVersion: true });
	const aeSdk = new AeSdk({
		nodes: [{ name: 'hc-alpha', instance: node }]
	});
	await aeSdk.addAccount(senderAccount, { select: true });
	console.log('node url', nodeUrl);
	console.log('staking address', mainStakingAddress);
	const stakingContract = await aeSdk.initializeContract({
		aci: msACI,
		address: mainStakingAddress
	});
	const hcElectionContract = await aeSdk.initializeContract({
		aci: hceACI,
		address: hcElectionAddress
	});

	return { keypair, senderAccount, node, aeSdk, stakingContract, hcElectionContract };
};
