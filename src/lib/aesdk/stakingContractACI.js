export default {"encodedAci":{"contract":{"functions":[{"arguments":[{"name":"staking_validator_ct","type":"StakingValidator"},{"name":"entropy_str","type":"string"},{"name":"validator_min_stake","type":"int"},{"name":"stake_minimum","type":"int"}],"name":"init","payable":false,"returns":"MainStaking.state","stateful":false},{"arguments":[],"name":"online_validators","payable":false,"returns":{"list":[{"tuple":["address","int"]}]},"stateful":false},{"arguments":[],"name":"offline_validators","payable":false,"returns":{"list":[{"tuple":["address","int"]}]},"stateful":false},{"arguments":[],"name":"new_validator","payable":true,"returns":"StakingValidator","stateful":true},{"arguments":[],"name":"set_online","payable":false,"returns":{"tuple":[]},"stateful":true},{"arguments":[],"name":"set_offline","payable":false,"returns":{"tuple":[]},"stateful":true},{"arguments":[{"name":"to","type":"address"}],"name":"stake","payable":true,"returns":{"tuple":[]},"stateful":true},{"arguments":[{"name":"from","type":"address"},{"name":"stakes","type":"int"}],"name":"unstake","payable":false,"returns":"int","stateful":true},{"arguments":[{"name":"to","type":"address"}],"name":"reward","payable":true,"returns":{"tuple":[]},"stateful":true},{"arguments":[{"name":"v","type":"address"}],"name":"get_validator_state","payable":false,"returns":"MainStaking.get_validator_response","stateful":false},{"arguments":[],"name":"get_state","payable":false,"returns":"MainStaking.get_state_response","stateful":false},{"arguments":[{"name":"name","type":"string"}],"name":"set_validator_name","payable":false,"returns":{"tuple":[]},"stateful":false},{"arguments":[{"name":"description","type":"string"}],"name":"set_validator_description","payable":false,"returns":{"tuple":[]},"stateful":false},{"arguments":[{"name":"avatar_url","type":"string"}],"name":"set_validator_avatar_url","payable":false,"returns":{"tuple":[]},"stateful":false},{"arguments":[],"name":"leader","payable":false,"returns":"address","stateful":false},{"arguments":[],"name":"elect","payable":false,"returns":{"tuple":[]},"stateful":true},{"arguments":[],"name":"elect_next","payable":false,"returns":"address","stateful":false},{"arguments":[{"name":"height","type":"int"}],"name":"elect_at_height","payable":false,"returns":"address","stateful":false},{"arguments":[{"name":"who","type":"address"}],"name":"staking_power","payable":false,"returns":"int","stateful":false},{"arguments":[{"name":"who","type":"address"}],"name":"is_validator_online","payable":false,"returns":"bool","stateful":false},{"arguments":[{"name":"who","type":"address"}],"name":"get_validator_contract","payable":false,"returns":"StakingValidator","stateful":false}],"kind":"contract_main","name":"MainStaking","payable":false,"state":{"record":[{"name":"staking_validator_ct","type":"StakingValidator"},{"name":"online_validators","type":{"map":["address","MainStaking.validator"]}},{"name":"offline_validators","type":{"map":["address","MainStaking.validator"]}},{"name":"total_stake","type":"int"},{"name":"entropy","type":"hash"},{"name":"leader","type":"address"},{"name":"validator_min_stake","type":"int"},{"name":"stake_minimum","type":"int"}]},"type_defs":[{"name":"bucket","typedef":{"variant":[{"ONLINE":[]},{"OFFLINE":[]}]},"vars":[]},{"name":"validator","typedef":{"record":[{"name":"ct","type":"StakingValidator"},{"name":"stake","type":"int"}]},"vars":[]},{"name":"get_validator_response","typedef":{"record":[{"name":"ct","type":"StakingValidator"},{"name":"stake","type":"int"},{"name":"is_online","type":"bool"},{"name":"state","type":"StakingValidator.validator_state"}]},"vars":[]},{"name":"get_state_response","typedef":{"record":[{"name":"staking_validator_ct","type":"StakingValidator"},{"name":"validators","type":{"list":["MainStaking.get_validator_response"]}},{"name":"total_stake","type":"int"},{"name":"entropy","type":"hash"},{"name":"leader","type":"address"},{"name":"validator_min_stake","type":"int"},{"name":"stake_minimum","type":"int"}]},"vars":[]}]}},"externalEncodedAci":[{"namespace":{"name":"ListInternal","type_defs":[]}},{"namespace":{"name":"List","type_defs":[]}},{"contract":{"functions":[{"arguments":[{"name":"_1","type":"address"}],"name":"init","payable":false,"returns":"unit","stateful":false},{"arguments":[{"name":"_1","type":"address"}],"name":"stake","payable":true,"returns":"unit","stateful":true},{"arguments":[],"name":"profit","payable":true,"returns":"unit","stateful":false},{"arguments":[{"name":"_1","type":"address"},{"name":"_2","type":"int"}],"name":"unstake","payable":false,"returns":"int","stateful":true},{"arguments":[],"name":"get_state","payable":false,"returns":"StakingValidator.validator_state","stateful":false},{"arguments":[{"name":"_1","type":"address"}],"name":"balance","payable":false,"returns":"int","stateful":false},{"arguments":[{"name":"_1","type":"address"}],"name":"shares","payable":false,"returns":"int","stateful":false},{"arguments":[],"name":"all_shares","payable":false,"returns":"int","stateful":false},{"arguments":[{"name":"_1","type":"string"}],"name":"set_name","payable":false,"returns":"unit","stateful":true},{"arguments":[{"name":"_1","type":"string"}],"name":"set_description","payable":false,"returns":"unit","stateful":true},{"arguments":[{"name":"_1","type":"string"}],"name":"set_avatar_url","payable":false,"returns":"unit","stateful":true}],"kind":"contract_interface","name":"StakingValidator","payable":false,"type_defs":[{"name":"validator_state","typedef":{"record":[{"name":"main_staking_ct","type":"address"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image_url","type":"string"},{"name":"delegates","type":{"map":["address","int"]}},{"name":"shares","type":"int"}]},"vars":[]}]}}],"interface":"\n\ncontract interface StakingValidator =\n  record validator_state = {main_staking_ct : address,name : string,description : string,image_url : string,delegates : map(address, int),shares : int}\n  entrypoint init : (address) => unit\n  payable stateful entrypoint stake : (address) => unit\n  payable entrypoint profit : () => unit\n  stateful entrypoint unstake : (address, int) => int\n  entrypoint get_state : () => StakingValidator.validator_state\n  entrypoint balance : (address) => int\n  entrypoint shares : (address) => int\n  entrypoint all_shares : () => int\n  stateful entrypoint set_name : (string) => unit\n  stateful entrypoint set_description : (string) => unit\n  stateful entrypoint set_avatar_url : (string) => unit\n\nmain contract MainStaking =\n  record state = {staking_validator_ct : StakingValidator,online_validators : map(address, MainStaking.validator),offline_validators : map(address, MainStaking.validator),total_stake : int,entropy : hash,leader : address,validator_min_stake : int,stake_minimum : int}\n  datatype bucket = ONLINE | OFFLINE\n  record validator = {ct : StakingValidator,stake : int}\n  record get_validator_response = {ct : StakingValidator,stake : int,is_online : bool,state : StakingValidator.validator_state}\n  record get_state_response = {staking_validator_ct : StakingValidator,validators : list(MainStaking.get_validator_response),total_stake : int,entropy : hash,leader : address,validator_min_stake : int,stake_minimum : int}\n  entrypoint init : (StakingValidator, string, int, int) => MainStaking.state\n  entrypoint online_validators : () => list((address * int))\n  entrypoint offline_validators : () => list((address * int))\n  payable stateful entrypoint new_validator : () => StakingValidator\n  stateful entrypoint set_online : () => unit\n  stateful entrypoint set_offline : () => unit\n  payable stateful entrypoint stake : (address) => unit\n  stateful entrypoint unstake : (address, int) => int\n  payable stateful entrypoint reward : (address) => unit\n  entrypoint get_validator_state : (address) => MainStaking.get_validator_response\n  entrypoint get_state : () => MainStaking.get_state_response\n  entrypoint set_validator_name : (string) => unit\n  entrypoint set_validator_description : (string) => unit\n  entrypoint set_validator_avatar_url : (string) => unit\n  entrypoint leader : () => address\n  stateful entrypoint elect : () => unit\n  entrypoint elect_next : () => address\n  entrypoint elect_at_height : (int) => address\n  entrypoint staking_power : (address) => int\n  entrypoint is_validator_online : (address) => bool\n  entrypoint get_validator_contract : (address) => StakingValidator\n"}