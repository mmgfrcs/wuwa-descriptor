// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'vite-plugin-pwa/pwa-assets';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare module '*.md' {
		import type { SvelteComponent } from 'svelte'
	
		export default class Comp extends SvelteComponent{}
	
		export const metadata: Record<string, unknown>
	}
	
	declare const BUILD_DATE: string
}

export {};
