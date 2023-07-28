import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [sveltekit({})],
		experimental: { prebundleSvelteLibraries: true },
		optimizeDeps: {
			esbuildOptions: { target: ['es2021'] }
		},
		build: { target: ['es2020'], sourcemap: true },
		ssr: {
			noExternal:
				command === 'serve'
					? []
					: ['@aeternity/aepp-sdk', '@aeternity/argon2',
						'@fortawesome/free-solid-svg-icons', 'dotenv']
		}
	};
});
