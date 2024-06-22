// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  experimental: {
    typedPages: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  primevue: {
    importTheme: {
      from: "@/utils/theme",
    },
  },
  mongoose: {
    options: {
      dbName: "prasarana",
    },
  },
  modules: [
    "nuxt3-leaflet",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "nuxt-icon",
    "nuxt-mongoose",
    "@nuxt/eslint",
  ],
})
