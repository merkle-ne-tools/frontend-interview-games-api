// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // css: ["~/assets/scss/main.scss"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  pages: true,
  css: ["~/assets/scss/main.scss"],

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api/v1",
    },
  },
});
