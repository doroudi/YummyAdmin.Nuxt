// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// export default defineNuxtPlugin((nuxtApp) => {
//   const pinia = nuxtApp.$pinia
//   if (pinia) {
//       if (import.meta.client) {
//           //Very important to only do this client-side, to avoid localStorage being undefined during ssg-build.
//           // Use the 'piniaPluginPersistedstate' for state persistence in Pinia stores.
//           pinia.use(piniaPluginPersistedstate)
//       }
//     pinia.use(piniaPluginPersistedstate)
//   }
// })
