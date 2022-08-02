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
      <post-list :items="latestPosts"></post-list>
      <div v-if="latestPosts.length >= state.limit_post" class="mt-5">
        More posts can be found
        <nuxt-link to="/archives/posts" class="link">here</nuxt-link>.
      </div>
    </section>

    <!-- Projects -->
    <section>
      <h2 class="text-2xl font-bold mb-5">Open Source Projects</h2>
      <project-list :items="projects"></project-list>
      <div v-if="projects.length >= state.limit_project" class="mt-5">
        More projects can be found
        <nuxt-link to="/archives/projects" class="link">here</nuxt-link>.
      </div>
    </section>
  </div>
</template>

<script setup>
import { sanitizePost } from '@/utils'

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
).map(sanitizePost)
</script>
