<template>
  <div class="space-y-10">
    <!-- Projects -->
    <section>
      <h2 class="text-2xl font-bold mb-5">Projects archive</h2>
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
    </section>
  </div>
</template>

<script setup>
const projects = await queryContent('projects')
  .sort({ priority: 1, archive: -1 })
  .only(['_id', 'title', 'description', 'link', 'archive'])
  .find()
</script>
