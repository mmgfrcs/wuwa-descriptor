import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), SvelteKitPWA({
		useCredentials: true,
		manifest: {
			name: "Wuthering Waves Descriptor",
			short_name: "WuWa Descriptor",
			icons: [
					{
							src: "/android-chrome-192x192.png",
							sizes: "192x192",
							type: "image/png"
					},
					{
							src: "/android-chrome-256x256.png",
							sizes: "256x256",
							type: "image/png"
					},
					{
							src: "/android-chrome-256x256.png",
							sizes: "256x256",
							type: "image/png",
							purpose: "any"
					},
					{
							src: "/android-chrome-256x256.png",
							sizes: "256x256",
							type: "image/png",
							purpose: "maskable"
					}
			],
			theme_color: "#222222",
			background_color: "#222222",
			display: "standalone"
		}
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
