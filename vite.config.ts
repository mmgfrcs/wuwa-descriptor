import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), SvelteKitPWA({
		useCredentials: true,
		devOptions: {
			enabled: true,
			type: "module"
		},
		manifest: {
			name: "Wuthering Waves Descriptor",
			short_name: "WuWa Descriptor",
			theme_color: "#7582ff",
			background_color: "#1d232a",
			display: "standalone"
		},
		pwaAssets: {
			preset: "minimal-2023",
			image: "static/favicon.png",
			injectThemeColor: true,
			overrideManifestIcons: true
		}
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
