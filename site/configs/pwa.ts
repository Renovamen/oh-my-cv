import type { ModuleOptions } from "@vite-pwa/nuxt";

const scope = "/";

export const pwa: ModuleOptions = {
  registerType: "autoUpdate",
  scope,
  base: scope,
  manifest: {
    id: scope,
    scope,
    name: "Oh My CV!",
    short_name: "Oh My CV!",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/favicon.svg",
        sizes: "512x512",
        type: "image/svg",
        purpose: "any maskable"
      }
    ]
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,otf,ttf,woff2,png,svg}"],
    maximumFileSizeToCacheInBytes: 16000000,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true
};
