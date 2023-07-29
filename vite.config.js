import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [sveltekit({})],
		build: { target: ['es2022'], sourcemap: true }
	};
});
