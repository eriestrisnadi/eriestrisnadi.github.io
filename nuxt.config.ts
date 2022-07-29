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
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/content'],
  colorMode: {
    preference: 'light',
    dataValue: 'theme',
  },
  publicRuntimeConfig: {
    profile: {
      name: process.env.PROFILE_NAME,
      short_name: process.env.PROFILE_SHORT_NAME,
      email: process.env.PROFILE_EMAIL,
      location: process.env.PROFILE_LOCATION,
      profession: process.env.PROFILE_PROFESSION,
      github_profile: process.env.PROFILE_GH_URL,
    },
  },
})
