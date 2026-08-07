import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'robots.txt', 'pwa-icon.svg'],
			manifest: {
				name: 'RadioSalafDirectory',
				short_name: 'RadioSalaf',
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#111111',
				icons: [
					{
						src: '/pwa-icon.svg',
						type: 'image/svg+xml',
						sizes: 'any'
					}
				]
			}
		})
	]
});
