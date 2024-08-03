import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), SvelteKitPWA({
		strategies: "generateSW",
		registerType: 'autoUpdate',
		useCredentials: true,
		devOptions: {
			enabled: true,
		},
		manifest: {
			name: "Wuthering Waves Descriptor",
			short_name: "WuWa Descriptor",
			theme_color: "#7582ff",
			background_color: "#1d232a",
			display: "standalone",
			orientation: "landscape"
		},
		pwaAssets: {
			preset: "minimal-2023",
			image: "static/favicon.png",
			injectThemeColor: true,
			overrideManifestIcons: true,
		},
		workbox: {
			globPatterns: ['/**/*.{html,js,css,ico,jpg,png,svg,webp,woff,woff2}']
		},
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
