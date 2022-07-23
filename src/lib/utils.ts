import JSONbig from 'json-bigint';
import { toAe } from '@aeternity/aepp-sdk';

const JSONbigConfigured = JSONbig({
	useNativeBigInt: true,
	storeAsString: false,
	alwaysParseAsBig: true
});

export const toJSON = (s: any) => {
	return JSONbigConfigured.stringify(s);
};

export const fromJSON = (s: string) => {
	return JSONbigConfigured.parse(s);
};

export const formatAE = (i: number | bigint) => {
	const aeAmount = toAe(i as any);
	return `${parseFloat(aeAmount).toLocaleString('en')} AE`;
};

export const unixTime = (): number => Math.floor(Date.now() / 1000);
