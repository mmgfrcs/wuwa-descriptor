/** @type Partial<import("vite-plugin-pwa").VitePWAOptions> */
let pwaConfig = {
    base: "/",
    scope: "/",
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
        orientation: "landscape",
        scope: "/",
        start_url: "/"
    },
    pwaAssets: {
        preset: "minimal-2023",
        image: "static/favicon.png",
        injectThemeColor: true,
        overrideManifestIcons: true
    },
    workbox: {
        cleanupOutdatedCaches: true,
        dontCacheBustURLsMatching: /-[a-f0-9]{8}\./,
        // globDirectory: './.vercel/output/static',
        // globPatterns: ['robots.txt', '**/*.{js,css,html,ico,png,svg,webp,avif,webmanifest}'],
        // globIgnores: ['**/sw*', '**/workbox-*'],
        globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,webmanifest,avif}', 'prerendered/**/*.html'],
        runtimeCaching: [
            {
                urlPattern: /api\/.*/i,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'cms-cache',
                    
                    backgroundSync: {
                        name: 'cms-sync',
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
}

export {pwaConfig}