<template>
  <div>
    <div class="flex justify-center">
      <div class="w-full max-w-6xl">
        <navbar></navbar>
      </div>
    </div>
    <slot />
    <div class="flex justify-center p-10 bg-neutral text-neutral-content">
      <div class="w-full max-w-6xl">
        <Footer />
      </div>
    </div>
  </div>
</template>
