<template>
  <div class="space-y-10">
    <profile
      avatar="E"
      name="R Eries Trisnandi"
      profession="Software Engineer"
      email="zdumb1885@gmail.com"
    ></profile>

    <section>
      <h2 class="text-2xl font-bold">Work</h2>
      <work :items="experiences"> </work>
    </section>
  </div>
</template>

<script setup>
const { data: experiences } = await useFetch('/api/experiences')
</script>
