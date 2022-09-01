import type { SdkInstance } from './aesdk/serverAeSdk';
import { mkSdkInstance } from './aesdk/serverAeSdk';

export interface ServerConfig {
	aeNodeURL: string;
	networkId: string;
	aeFaucetURL: string;
	aeWalletURL: string;
	stakingContract: string;
	hcElectionContract: string;
	sdkInstance: SdkInstance;
	// TODO, fix this to get fetched from the contract once it gets updated (remove this data structure from here)
}

export const configServer = async (): Promise<ServerConfig> => {
	const aeNodeURL = getEnvVar('AE_NODE_URL');
	const stakingContract = getEnvVar('STAKING_CONTRACT');
	const hcElectionContract = getEnvVar('HC_ELECTION_CONTRACT');
	const sdkInstance = await mkSdkInstance(aeNodeURL, stakingContract, hcElectionContract);
	const networkId = await sdkInstance.aeSdk.getNetworkId();
	return {
		aeNodeURL,
		networkId,
		aeFaucetURL: getEnvVar('AE_FAUCET_URL'),
		aeWalletURL: getEnvVar('AE_WALLET_URL'),
		stakingContract,
		hcElectionContract,
		sdkInstance
	};
};

export const getEnvVar = (varName: string): string => {
	const envVar = process.env[varName];
	if (!envVar) {
		throw new Error(`${varName} environment variable required`);
	}
	return envVar;
};
