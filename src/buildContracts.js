import axios from 'axios';
import sdk from '@aeternity/aepp-sdk';
import fs from 'fs';
import dotenv from 'dotenv';

const { AeSdk, Node } = sdk;

const MAIN_STAKING_URL =
	'https://raw.githubusercontent.com/aeternity/aeternity/master/test/contracts/MainStaking.aes';
const HC_ELECTION_URL =
	'https://raw.githubusercontent.com/aeternity/aeternity/master/test/contracts/HCElection.aes';

const COMPILER_URL = 'https://compiler.aeternity.io';

dotenv.config();

const getEnvVar = (/** @type {string} */ varName) => {
	const envVar = process.env[varName];
	if (!envVar) {
		throw new Error(`${varName} environment variable required`);
	}
	return envVar;
};

const getAndCompile = async () => {
	const mainStakingSource = await (await axios.get(MAIN_STAKING_URL)).data.trim();
	// console.log(mainStakingSource);
	const node = new Node(getEnvVar('AE_NODE_URL'));
	const aeSdk = new AeSdk({
		nodes: [{ name: 'hc-alpha', instance: node }],
		compilerUrl: COMPILER_URL
	});
	const mainStaking = await aeSdk.getContractInstance({ source: mainStakingSource });
	// console.log('ACI is: ', mainStaking._aci);
	const msACI = JSON.stringify(mainStaking._aci);
	const msFileContents = `export default ${msACI}`;
	const msFile = 'src/lib/aesdk/MainStakingACI.js';
	console.log('writing', msFile);
	fs.writeFile(msFile, msFileContents, (err) => {
		if (err) {
			console.log('ERROR:', err);
		}
	});

	const hcElectionSource = await (await axios.get(HC_ELECTION_URL)).data.trim();
	const hcElection = await aeSdk.getContractInstance({ source: hcElectionSource });
	const hcACI = JSON.stringify(hcElection._aci);
	const hcFileContents = `export default ${hcACI}`;
	const hcFile = 'src/lib/aesdk/HCElectionACI.js';
	console.log('writing', hcFile);
	fs.writeFile(hcFile, hcFileContents, (err) => {
		if (err) {
			console.log('ERROR:', err);
		}
	});
};

getAndCompile();
