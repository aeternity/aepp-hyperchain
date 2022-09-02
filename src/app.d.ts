/// <reference types="@sveltejs/kit" />

import type { ServerConfig } from './lib/serverConfig';
import { ContractsState } from './lib/aesdk/contractState';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			serverConfig: ServerConfig;
			stateWithTimestamp: ContractsState | null | undefined;
		}
		// interface Platform {}
		interface Session {
			wallet?: string;
		}
		// interface Stuff {}
	}
}
