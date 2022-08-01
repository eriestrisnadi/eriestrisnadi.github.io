<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex justify-center">
      <div class="w-full max-w-4xl">
        <navbar></navbar>
      </div>
    </div>
    <div class="flex-1 space-y-10 flex flex-col">
      <div class="flex-1 flex flex-col items-center">
        <div class="w-full max-w-4xl px-2">
          <slot />
        </div>
      </div>
      <div
        class="flex justify-center p-10 bg-neutral text-neutral-content"
        data-theme="dark"
      >
        <div class="w-full max-w-4xl">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>
