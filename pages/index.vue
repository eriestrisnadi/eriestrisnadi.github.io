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
      <work
        :items="[
          { content: 'Experience 2', date: '2022' },
          { content: 'Experience 1', date: '2021' },
        ]"
      ></work>
    </section>
    <tutorial></tutorial>
  </div>
</template>
