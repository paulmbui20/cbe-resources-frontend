import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	// Load env file based on current mode (development / production)
	const env = loadEnv(mode, process.cwd(), '');

	const allowedHosts = env.VITE_ALLOWED_HOSTS
		? env.VITE_ALLOWED_HOSTS.split(',').map((h) => h.trim())
		: [];

	return {
		plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
		server: {
			allowedHosts
		}
	};
});
