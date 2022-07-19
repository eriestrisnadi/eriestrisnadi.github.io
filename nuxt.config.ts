import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: '//fonts.googleapis.com' },
        { rel: 'preconnect', href: '//fonts.gstatic.com', crossOrigin: true },
        {
          rel: 'stylesheet',
          href: '//fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap',
        },
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
  },
})
