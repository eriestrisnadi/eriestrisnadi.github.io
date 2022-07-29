<template>
  <div class="space-y-10">
    <profile
      :avatar="state.short_name"
      :full-name="state.name"
      :profession="state.profession"
      :email="state.email"
      :location="state.location"
    ></profile>

    <section>
      <h2 class="text-2xl font-bold mb-5">Experience</h2>
      <work :items="experiences" short></work>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-5">Writing</h2>
      <div
        v-for="post in latestPosts"
        :key="post._id"
        class="font-semibold border-b border-current-color py-2"
      >
        <a href="/" class="flex items-center leading-none space-x-3">
          <span class="font-normal">{{ post.date }}</span>
          <h2 class="text-lg link link-hover">{{ post.title }}</h2>
        </a>
      </div>
      <div v-if="latestPosts.length >= state.limit_post" class="mt-5">
        More posts can be found <a href="/" class="link">here</a>.
      </div>
    </section>
  </div>
</template>

<script setup>
const state = {
  ...useRuntimeConfig().profile,
  limit_post: 5,
}
const experiences = await queryContent('experiences')
  .sort({ time_period: -1 })
  .only(['time_period', 'company_name', 'job_role', 'location'])
  .find()
const latestPosts = (
  await queryContent('writing')
    .sort({ _path: -1 })
    .only(['_id', 'title'])
    .limit(state.limit_post)
    .find()
).map((post) => {
  const _dateParts = post._id.split(':').splice(2, 1).pop().split('')
  const dd = _dateParts.splice(0, 2).join('')
  const mm = _dateParts.splice(0, 2).join('')
  const yyyy = _dateParts.splice(0, 4).join('')
  const date = `${yyyy}-${mm}-${dd}`

  return {
    ...post,
    date,
  }
})
</script>
