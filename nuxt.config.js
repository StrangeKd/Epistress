module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "epistress",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          register: {
            url: "user/register",
            method: "post",
            propertyName: "data",
          },
          login: { url: "user/login", method: "post", propertyName: "data" },
          user: { url: "user/", method: "get", propertyName: "data" },
          logout: false,
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  telemetry: false,

  srcDir: "src/",

  layout: "default",
};
