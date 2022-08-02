<template>
  <div>
    <div
      v-for="item in items"
      :key="item._id"
      class="font-semibold border-b border-current-color py-2"
    >
      <nuxt-link
        :to="`/posts${item.slug}`"
        class="flex items-center leading-none space-x-3"
      >
        <span class="font-normal">{{ item.date }}</span>
        <h2 class="text-lg link link-hover">{{ item.title }}</h2>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
