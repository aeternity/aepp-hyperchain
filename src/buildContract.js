import axios from 'axios';
import sdk from '@aeternity/aepp-sdk';
const { AeSdk, Node } = sdk;

const NODE_URL = 'https://testnet-hc.aeternity.io/';
const CONTRACT_SOURCE_URL =
	'https://raw.githubusercontent.com/aeternity/aeternity/hc_alpha/test/contracts/MainStaking.aes';
const COMPILER_URL = 'https://compiler.aeternity.io';

const getAndCompile = async () => {
	const fetchedSource = await (await axios.get(CONTRACT_SOURCE_URL)).data.trim();
	console.log(fetchedSource);
	const node = new Node(NODE_URL);
	const aeSdk = new AeSdk({
		nodes: [{ name: 'hc-alpha', instance: node }],
		compilerUrl: COMPILER_URL
	});
	const contract = await aeSdk.getContractInstance({ source: fetchedSource });
	console.log('ACI is: ', contract._aci);
};

getAndCompile();
