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
      <h2 class="text-2xl font-bold mb-5">Experiences</h2>
      <work :items="experiences" short></work>
    </section>
  </div>
</template>

<script setup>
const state = useRuntimeConfig().profile
const experiences = await queryContent('experiences')
  .sort({ time_period: -1 })
  .find()
</script>
