import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import {pwaConfig} from './pwa-config'

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(), SvelteKitPWA(pwaConfig)],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		BUILD_DATE: new Date()
	}
});
