<template>
  <div class="space-y-10">
    <!-- Projects -->
    <section>
      <h2 class="text-2xl font-bold mb-5">Projects archive</h2>
      <project-list :items="projects"></project-list>
    </section>
  </div>
</template>

<script setup>
const projects = await queryContent('projects')
  .sort({ priority: 1, archive: -1 })
  .only(['_id', 'title', 'description', 'link', 'archive'])
  .find()
</script>
