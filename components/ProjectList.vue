<template>
  <div class="grid sm:grid-cols-3 gap-2">
    <div
      v-for="item in items"
      :key="item._id"
      class="card card-compact w-full border-2"
    >
      <div class="card-body">
        <h2 class="card-title">
          {{ item.title }}
          <div v-if="item.archive" class="badge badge-secondary">Archive</div>
        </h2>
        <p>{{ item.description }}</p>
        <div class="card-actions justify-end">
          <nuxt-link
            :to="item.link"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-sm btn-ghost"
          >
            View details
          </nuxt-link>
        </div>
      </div>
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
