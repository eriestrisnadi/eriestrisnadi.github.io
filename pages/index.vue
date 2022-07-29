<template>
  <div class="space-y-10">
    <profile
      avatar="E"
      name="R. Eries Trisnandi"
      profession="Software Engineer"
      email="zdumb1885@gmail.com"
      location="Bandung, Indonesia"
    ></profile>

    <section>
      <h2 class="text-2xl font-bold mb-5">Experiences</h2>
      <work :items="experiences" short></work>
    </section>
  </div>
</template>

<script setup>
const experiences = await queryContent('experiences')
  .sort({ time_period: -1 })
  .find()
</script>
