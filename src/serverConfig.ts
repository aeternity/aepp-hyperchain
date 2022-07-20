export interface ServerConfig {
	aeNodeURL: string;
	aeFaucetURL: string;
	aeWalletURL: string;
}

export const configServer = (): ServerConfig => {
	return {
		aeNodeURL: getEnvVar('AE_NODE_URL'),
		aeFaucetURL: getEnvVar('AE_FAUCET_URL'),
		aeWalletURL: getEnvVar('AE_WALLET_URL')
	};
};

const getEnvVar = (varName: string): string => {
	const envVar = process.env[varName];
	if (!envVar) {
		throw new Error(`${varName} required in .env`);
	}
	return envVar;
};
