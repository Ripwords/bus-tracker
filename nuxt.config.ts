// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    mongoString: process.env.MONGO_STRING,
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  primevue: {
    directives: {
      include: ["FocusTrap"],
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    "primeicons/primeicons.css",
  ],
  modules: [
    "nuxt3-leaflet",
    "@nuxtjs/tailwindcss",
    "nuxt-primevue",
    "nuxt-icon",
  ],
})