import type { ClientGlobalConfig } from '$lib/ClientGlobalConfig';
import { writable } from 'svelte/store';

export const clientGlobalConfigStore = writable<ClientGlobalConfig | undefined>();

export const minStakeAetto = writable<bigint>(0n);
