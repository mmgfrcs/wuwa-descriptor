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
			description: "Describe Wuthering Waves Character Skills better.",
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
			clientsClaim: true,
			globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,webmanifest,avif}', 'prerendered/**/*.html'],
			runtimeCaching: [
				{
					urlPattern: /^https:\/\/wuwadesc\.pockethost\.io\/api\/files\/.*/i,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'cms-image-cache',
						backgroundSync: {
							name: 'cms-img-sync',
							options: {
								maxRetentionTime: 24*60
							}
						},
						cacheableResponse: {
							statuses: [0, 200]
						}
					}
				},
				{
					urlPattern: /^https:\/\/wuwadesc\.pockethost\.io\/api\/collections\/.*/i,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'cms-data-cache',
						backgroundSync: {
							name: 'cms-data-sync',
							options: {
								maxRetentionTime: 24*60
							}
						},
						cacheableResponse: {
							statuses: [0, 200]
						}
					}
				},
				{
					urlPattern: /\.*/,
					handler: 'NetworkFirst',
					options: {
						cacheName: 'site-cache',
						cacheableResponse: {
							statuses: [0, 200]
						}
					}
				},
			],
			navigationPreload: true,
			navigateFallback: null,
		},
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
