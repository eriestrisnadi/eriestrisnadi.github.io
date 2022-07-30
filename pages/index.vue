<template>
  <div class="space-y-10">
    <profile
      :avatar="state.short_name"
      :full-name="state.name"
      :profession="state.profession"
      :email="state.email"
      :location="state.location"
    ></profile>

    <!-- Experience -->
    <section>
      <h2 class="text-2xl font-bold mb-5">Professional Experience</h2>
      <work :items="experiences" short></work>
    </section>

    <!-- Writing -->
    <section>
      <h2 class="text-2xl font-bold mb-5">Published Writing</h2>
      <div
        v-for="post in latestPosts"
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
      <div v-if="latestPosts.length >= state.limit_post" class="mt-5">
        More posts can be found
        <nuxt-link to="/archives/posts" class="link">here</nuxt-link>.
      </div>
    </section>

    <!-- Projects -->
    <section>
      <h2 class="text-2xl font-bold mb-5">Open Source Projects</h2>
      <div class="grid sm:grid-cols-3 gap-2">
        <div
          v-for="project in projects"
          :key="project._id"
          class="card card-compact w-full border-2"
        >
          <div class="card-body">
            <h2 class="card-title">
              {{ project.title }}
              <div v-if="project.archive" class="badge badge-secondary">
                Archive
              </div>
            </h2>
            <p>{{ project.description }}</p>
            <div class="card-actions justify-end">
              <nuxt-link
                :to="project.link"
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
      <div v-if="projects.length >= state.limit_project" class="mt-5">
        More projects can be found
        <nuxt-link to="/archives/projects" class="link">here</nuxt-link>.
      </div>
    </section>
  </div>
</template>

<script setup>
const state = {
  ...useRuntimeConfig().profile,
  limit_post: 8,
  limit_project: 6,
}
const experiences = await queryContent('experiences')
  .sort({ time_period: -1 })
  .only(['time_period', 'company_name', 'job_role', 'location'])
  .find()
const projects = await queryContent('projects')
  .sort({ priority: 1, archive: -1 })
  .only(['_id', 'title', 'description', 'link', 'archive'])
  .limit(state.limit_project)
  .find()
const latestPosts = (
  await queryContent('writing')
    .sort({ _path: -1 })
    .only(['_id', 'title'])
    .limit(state.limit_post)
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
