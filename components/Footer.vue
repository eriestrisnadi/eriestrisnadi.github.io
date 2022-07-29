<template>
  <footer class="footer footer-center">
    <div class="flex">
      <span class="tooltip tooltip-primary" data-tip="GitHub">
        <a :href="state.github_profile" class="btn btn-sm btn-circle btn-ghost">
          <icon-github class="h-6 w-6"></icon-github>
        </a>
      </span>
      <span class="tooltip tooltip-primary" data-tip="Mail">
        <a
          :href="`mailto:${state.email}`"
          class="btn btn-sm btn-circle btn-ghost"
        >
          <icon-mail class="h-6 w-6"></icon-mail>
        </a>
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <div class="opacity-60">{{ state.location }} - {{ state.email }}</div>
      <div class="text-xs opacity-50">
        Copyright &copy; 2022 - All rights reserved
      </div>
      <icon-brand class="w-20 mt-6 opacity-60"></icon-brand>
    </div>
  </footer>
</template>

<script setup>
const state = useRuntimeConfig().profile
</script>
