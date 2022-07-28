<template>
  <div>
    <div class="flex justify-center">
      <div class="w-full max-w-6xl">
        <navbar></navbar>
      </div>
    </div>
    <div class="space-y-10">
      <div class="flex flex-col items-center">
        <div class="w-full max-w-6xl px-2">
          <slot />
        </div>
      </div>
      <div class="flex justify-center p-10 bg-neutral text-neutral-content">
        <div class="w-full max-w-6xl">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>
