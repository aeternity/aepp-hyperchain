import type { SdkInstance } from './aesdk/serverAeSdk';
import { mkSdkInstance } from './aesdk/serverAeSdk';

export interface ValidatorDesc {
	ak: string;
	ct: string;
	name: string;
}

export interface ServerConfig {
	aeNodeURL: string;
	networkId: string;
	aeFaucetURL: string;
	aeWalletURL: string;
	stakingContract: string;
	sdkInstance: SdkInstance;
	// TODO, fix this to get fetched from the contract once it gets updated (remove this data structure from here)
	hardcodedValidatorsMapping: ValidatorDesc[];
}

const hardcodedValidatorsMapping: ServerConfig['hardcodedValidatorsMapping'] = [
	{
		name: 'Bob',
		ak: 'ak_nQpnNuBPQwibGpSJmjAah6r3ktAB7pG9JHuaGWHgLKxaKqEvC',
		ct: 'ct_2LQ8WUFCb8hQiu7PpdbfNEmphqMhK8Eu8YaRTvEimoKzz4CfSN'
	},
	{
		name: 'Alice',
		ak: 'ak_2MGLPW2CHTDXJhqFJezqSwYSNwbZokSKkG7wSbGtVmeyjGfHtm',
		ct: 'ct_xZDAkM8rJNUVb7EkD9QUMniVJ3y521dqAziVerxER58QkFy6B'
	}
];
export const getValidatorByAk = (ak: string): ValidatorDesc | undefined =>
	hardcodedValidatorsMapping.find((v) => v.ak === ak);

export const getValidatorByCt = (ct: string): ValidatorDesc | undefined =>
	hardcodedValidatorsMapping.find((v) => v.ct == ct);

export const configServer = async (): Promise<ServerConfig> => {
	const aeNodeURL = getEnvVar('AE_NODE_URL');
	const stakingContract = getEnvVar('STAKING_CONTRACT');
	const sdkInstance = await mkSdkInstance(aeNodeURL, stakingContract);
	const networkId = await sdkInstance.aeSdk.getNetworkId();
	return {
		aeNodeURL,
		networkId,
		aeFaucetURL: getEnvVar('AE_FAUCET_URL'),
		aeWalletURL: getEnvVar('AE_WALLET_URL'),
		stakingContract,
		sdkInstance,
		hardcodedValidatorsMapping
	};
};

const getEnvVar = (varName: string): string => {
	const envVar = process.env[varName];
	if (!envVar) {
		throw new Error(`${varName} environment variable required`);
	}
	return envVar;
};
