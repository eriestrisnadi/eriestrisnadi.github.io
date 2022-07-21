<template>
  <div
    class="overflow-hidden btn btn-sm btn-circle btn-ghost"
    @click="
      () => {
        colorMode.preference =
          colorMode.preference === 'light' ? 'dark' : 'light'
      }
    "
  >
    <icon-sun
      v-show="colorMode.preference === 'dark'"
      class="m-[.5em] w-4 h-4 fill-current group-first:ml-[-1.7em]"
    >
    </icon-sun>
    <icon-eclipse
      v-show="colorMode.preference === 'light'"
      class="m-[.5em] w-4 h-4"
    >
    </icon-eclipse>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
</script>
