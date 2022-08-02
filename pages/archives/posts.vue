<template>
  <div class="space-y-10">
    <!-- Writing -->
    <section>
      <h2 class="text-2xl font-bold mb-5">Posts archive</h2>
      <post-list :items="posts"></post-list>
    </section>
  </div>
</template>

<script setup>
import { sanitizePost } from '@/utils'

const posts = (
  await queryContent('writing')
    .sort({ _path: -1 })
    .only(['_id', 'title'])
    .find()
).map(sanitizePost)
</script>
