import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: { esbuildOptions: { target: ['es2020'] } },
	build: { target: ['es2020'] }
};

export default config;
