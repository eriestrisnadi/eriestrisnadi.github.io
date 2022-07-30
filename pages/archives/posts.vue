<template>
  <div class="space-y-10">
    <!-- Writing -->
    <section>
      <h2 class="text-2xl font-bold mb-5">Posts archive</h2>
      <div
        v-for="post in posts"
        :key="post._id"
        class="font-semibold border-b border-current-color py-2"
      >
        <nuxt-link
          :to="`/posts${post.slug}`"
          class="flex items-center leading-none space-x-3"
        >
          <span class="font-normal">{{ post.date }}</span>
          <h2 class="text-lg link link-hover">{{ post.title }}</h2>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script setup>
const posts = (
  await queryContent('writing')
    .sort({ _path: -1 })
    .only(['_id', 'title'])
    .find()
).map((post) => {
  const _dateParts = post._id.split(':').splice(2, 1).pop().split('')
  const slug = post._id
    .replace(/(^(:?(content|writing))*|\.md$)/g, '')
    .replace(/:/g, '/')
  const dd = _dateParts.splice(0, 2).join('')
  const mm = _dateParts.splice(0, 2).join('')
  const yyyy = _dateParts.splice(0, 4).join('')
  const date = `${yyyy}-${mm}-${dd}`

  return {
    ...post,
    slug,
    date,
  }
})
</script>
