/// <reference types="@sveltejs/kit" />

import type { ServerConfig } from './serverConfig';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			serverConfig: ServerConfig;
		}
		// interface Platform {}
		// interface Session {}
		// interface Stuff {}
	}
}
