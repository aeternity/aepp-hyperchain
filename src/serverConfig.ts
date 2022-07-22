import type { SdkInstance } from './lib/aesdk/instance';
import { mkSdkInstance } from './lib/aesdk/instance';

export interface ServerConfig {
	aeNodeURL: string;
	aeFaucetURL: string;
	aeWalletURL: string;
	stakingContract: string;
	sdkInstance: SdkInstance;
}

export const configServer = async (): Promise<ServerConfig> => {
	const aeNodeURL = getEnvVar('AE_NODE_URL');
	const stakingContract = getEnvVar('STAKING_CONTRACT');
	const sdkInstance = await mkSdkInstance(aeNodeURL, stakingContract);
	return {
		aeNodeURL,
		aeFaucetURL: getEnvVar('AE_FAUCET_URL'),
		aeWalletURL: getEnvVar('AE_WALLET_URL'),
		stakingContract,
		sdkInstance
	};
};

const getEnvVar = (varName: string): string => {
	const envVar = process.env[varName];
	if (!envVar) {
		throw new Error(`${varName} required in .env`);
	}
	return envVar;
};
