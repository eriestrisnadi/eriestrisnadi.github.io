<template>
  <section class="space-y-10">
    <div class="space-y-5">
      <h1 class="text-2xl font-bold">{{ state.title }}</h1>
      <h4 class="text-lg font-semibold text-neutral-content text-opacity-70">
        {{ state.description }}
      </h4>
    </div>

    <content-renderer
      v-if="!state._empty"
      class="text-sm mt-3 prose prose-sm"
      :value="state"
    ></content-renderer>
  </section>
</template>

<script setup>
import { createError } from 'h3'

const route = useRoute()
const state = await queryContent('writing', ...route.params.slug)
  .findOne()
  .catch((err) => {
    throw createError(err.data)
  })
</script>
