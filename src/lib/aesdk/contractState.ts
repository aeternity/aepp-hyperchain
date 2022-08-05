import type { SdkInstance } from './serverAeSdk';
import { z } from 'zod';

export const getContractState = async (sdkInstance: SdkInstance) => {
	const resp = await sdkInstance.stakingContract.call('get_state', [], { callStatic: true });
	return StateDecodedResult.parse(resp.decodedResult);
};

export const ValidatorState = z.object({
	description: z.string(),
	image_url: z.string(),
	name: z.string(),
	shares: z.bigint(),
	main_staking_ct: z.string(),
	delegates: z
		.map(z.string(), z.bigint())
		.or(z.record(z.string(), z.bigint()))
		.transform((val) => {
			if (val instanceof Map) {
				return Object.fromEntries(val);
			} else {
				return val;
			}
		})
});
export type ValidatorState = z.infer<typeof ValidatorState>;

export const Validator = z.object({
	ct: z.string(),
	is_online: z.boolean(),
	stake: z.bigint(),
	state: ValidatorState
});
export type Validator = z.infer<typeof Validator>;

export const StateDecodedResult = z.object({
	leader: z.string(),
	stake_minimum: z.bigint(),
	staking_validator_ct: z.string(),
	total_stake: z.bigint(),
	validator_min_stake: z.bigint(),
	validators: z.array(Validator)
});
export type StateDecodedResult = z.infer<typeof StateDecodedResult>;

export type ContractStateWithTimestamp = { st: StateDecodedResult; ts: number };

export const getAddrShares = (validator: Validator, addr: string) =>
	Object.entries(validator.state.delegates).find(([k, v]) => k === addr)?.[1];

export const sharesToAetto = (validator: Validator, shares: bigint) =>
	(shares * validator.stake) / validator.state.shares;

export const totalStakedForAddr = (st: StateDecodedResult, addr: string): bigint => {
	return st?.validators
		.map((v) => {
			const sh = getAddrShares(v, addr) || 0n;
			const aetto = sharesToAetto(v, sh);
			return aetto;
		})
		.reduce((total, cur) => total + cur, 0n);
};
