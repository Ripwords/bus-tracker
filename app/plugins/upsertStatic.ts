export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    $fetch("/api/staticInfo/rapid-bus-kl/upsert", {
      method: "POST",
    })
  }
})
