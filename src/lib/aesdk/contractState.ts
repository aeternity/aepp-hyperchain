import type { SdkInstance } from './serverAeSdk';
import { z } from 'zod';

export const getContractState = async (
	sdkInstance: SdkInstance
): Promise<[MainStakingState, HCElectionState]> => {
	// console.log('staking contract', sdkInstance.stakingContract);
	// console.log('Call MainStaking:get_state');
	const resp = await sdkInstance.stakingContract.$call('get_state', [], { callStatic: true });
	// console.log('MainStaking state', resp.decodedResult);
	const msState = MainStakingState.parse(resp.decodedResult);


	// console.log('Get HCElection state');
	const hcElectionState = await sdkInstance.hcElectionContract.$call('get_state', [], {
		callStatic: true
	});
	// console.log('HCElection state', hcElectionState.decodedResult);
	const hcState = HCElectionState.parse(hcElectionState.decodedResult);
	// console.log('Call HCElection:leader');
	// const leader = await sdkInstance.hcElectionContract.$call('leader', [], {
	// 	callStatic: true
	// });
	// console.log('hcElection leader', leader.decodedResult);
	// const hcState = HCElectionState.parse({leader: leader.decodedResult});

	return [msState, hcState];
};

const RecordOrMap = z
	.map(z.string(), z.bigint())
	.or(z.record(z.string(), z.bigint()))
	.transform((val) => {
		if (val instanceof Map) {
			return Object.fromEntries(val);
		} else {
			return val;
		}
	});

export const ValidatorState = z
	.object({
		description: z.string(),
		image_url: z.string(),
		name: z.string(),
		shares: z.bigint(),
		main_staking_ct: z.string(),
		unstake_delay: z.bigint(),
		pending_unstake_amount: z.bigint(),
		pending_unstake: RecordOrMap,
		delegates: RecordOrMap
	})
	.strict();
export type ValidatorState = z.infer<typeof ValidatorState>;

export const Validator = z
	.object({
		ct: z.string(),
		is_online: z.boolean(),
		stake: z.bigint(),
		state: ValidatorState,
		address: z.string(),
		creation_height: z.bigint(),
		pending_stake: z.bigint(),
		stake_limit: z.bigint()
	})
	.strict();
export type Validator = z.infer<typeof Validator>;

export const MainStakingState = z
	.object({
		// leader: z.string(),
		stake_minimum: z.bigint(),
		staking_validator_ct: z.string(),
		total_stake: z.bigint(),
		validator_min_stake: z.bigint(),
		validator_min_percent: z.bigint(),
		online_delay: z.bigint(),
		stake_delay: z.bigint(),
		unstake_delay: z.bigint(),
		validators: z.array(Validator)
	})
	.strict();
export type MainStakingState = z.infer<typeof MainStakingState>;

export const HCElectionState = z.object({ leader: z.string(), epoch: z.bigint() });
export type HCElectionState = z.infer<typeof HCElectionState>;

export const ContractState = z.object({
	st: MainStakingState,
	hcElection: HCElectionState,
	ts: z.bigint(),
	height: z.bigint()
});
export type ContractsState = z.infer<typeof ContractState>;

export const getAddrShares = (validator: Validator, addr: string) =>
	Object.entries(validator.state.delegates).find(([k, v]) => k === addr)?.[1];

export const sharesToAetto = (validator: Validator, shares: bigint) =>
	(shares * validator.stake) / validator.state.shares;

export const totalStakedForAddr = (st: MainStakingState, addr: string): bigint => {
	return st?.validators
		.map((v) => {
			const sh = getAddrShares(v, addr) || 0n;
			const aetto = sharesToAetto(v, sh);
			return aetto;
		})
		.reduce((total, cur) => total + cur, 0n);
};

export const getValidatorByCt = (validators: Validator[], ct: string): Validator | undefined =>
	validators.find((v) => v.ct === ct);

export const getValidatorByAk = (validators: Validator[], ak: string): Validator | undefined =>
	validators.find((v) => v.address === ak);
