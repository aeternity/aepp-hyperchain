import JSONbig from 'json-bigint';
import { toAe } from '@aeternity/aepp-sdk';
import { sizeFormatter } from 'human-readable';

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

export const aettoToAe = (i: number | bigint) => {
	const aeAmount = (+toAe(i as any)).toFixed(3);
	return parseFloat(aeAmount);
};

export const unixTime = (): number => Math.floor(Date.now() / 1000);

export const humanReadableFormatter = sizeFormatter({
	std: 'SI',
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}`
});
