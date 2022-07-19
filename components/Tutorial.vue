<!-- Please remove this file from your project -->
<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-base-100 sm:items-center sm:pt-0"
  >
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <a
        class="flex justify-center pt-8 sm:pt-0"
        href="https://nuxtjs.org"
        target="_blank"
      >
        <nuxt-logo></nuxt-logo>
      </a>
      <div class="mt-8 bg-base-300 overflow-hidden shadow sm:rounded-lg p-6">
        <h2 class="text-2xl leading-7 font-semibold">
          Welcome to your Nuxt Application
        </h2>
        <p class="mt-3">
          We recommend you take a look at the
          <a
            href="https://v3.nuxtjs.org"
            target="_blank"
            class="text-green-500 hover:underline"
            >Nuxt documentation</a
          >, whether you are new or have previous experience with the
          framework.<br />
        </p>
        <p class="mt-4 pt-4 border-t border-dashed">
          To get started, remove
          <code class="bg-base-100 text-sm p-1 rounded border"
            >components/Tutorial.vue</code
          >
          and start coding in
          <code class="bg-base-100 text-sm p-1 rounded border"
            >pages/index.vue</code
          >. Have fun!
        </p>
      </div>
      <div class="flex justify-center pt-4 space-x-2">
        <a href="https://github.com/nuxt/nuxt.js" target="_blank">
          <icon-github class="w-6 h-6"></icon-github>
        </a>
        <a href="https://twitter.com/nuxt_js" target="_blank">
          <icon-twitter class="w-6 h-6"></icon-twitter>
        </a>
      </div>
    </div>
  </div>
</template>
