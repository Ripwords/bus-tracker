export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:loading:start", async () => {
    await import("primeicons/primeicons.css")
  })
})
