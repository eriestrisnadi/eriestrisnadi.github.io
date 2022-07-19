<template>
  <div class="h-16">
    <div
      class="fixed left-0 z-20 flex justify-center w-full bg-base-100 backdrop-blur-lg bg-opacity-90"
    >
      <div class="relative z-10 w-full max-w-6xl navbar">
        <div class="flex-1">
          <a
            aria-label="Homepage"
            href="/"
            class="text-2xl tracking-widest uppercase font-title btn btn-ghost"
          >
            <icon-brand class="w-20"></icon-brand>
          </a>
        </div>
        <div class="flex-none">
          <theme-mode></theme-mode>
        </div>
      </div>
    </div>
  </div>
</template>
