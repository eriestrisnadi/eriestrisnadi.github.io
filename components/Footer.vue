<template>
  <footer class="footer footer-center">
    <div class="flex">
      <span class="tooltip tooltip-secondary" data-tip="GitHub">
        <a
          href="https://github.com/eriestrisnadi"
          class="btn btn-sm btn-circle btn-ghost"
        >
          <icon-github class="h-6 w-6"></icon-github>
        </a>
      </span>
      <span class="tooltip tooltip-secondary" data-tip="Mail">
        <a :href="`mailto:${email}`" class="btn btn-sm btn-circle btn-ghost">
          <icon-mail class="h-6 w-6"></icon-mail>
        </a>
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <div class="opacity-60">Bandung, Indonesia - {{ email }}</div>
      <div class="text-xs opacity-50">
        Copyright &copy; 2022 - All rights reserved
      </div>
      <icon-brand class="w-20 mt-6 opacity-60"></icon-brand>
    </div>
  </footer>
</template>

<script setup>
const email = 'zdumb1885@gmail.com'
</script>
