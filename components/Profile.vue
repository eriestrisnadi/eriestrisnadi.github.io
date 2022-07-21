<template>
  <div class="flex">
    <div class="flex flex-1 flex-col items-center space-y-4">
      <div
        class="avatar"
        :class="{
          placeholder: !imageSource,
        }"
      >
        <div
          class="w-24 mask mask-hexagon"
          :class="{ 'bg-base-300': !imageSource }"
        >
          <client-only>
            <img
              v-show="imageSource"
              :src="avatar"
              @error="imageSource = undefined"
            />
          </client-only>
          <span v-if="!imageSource" class="text-3xl">{{ avatar }}</span>
        </div>
      </div>

      <div v-if="name || profession || email" class="space-y-2">
        <h3 v-if="name" class="text-2xl text-center font-semibold uppercase">
          {{ name }}
        </h3>
        <h5
          v-if="profession || email"
          class="text-base text-center font-semibold"
        >
          <p v-if="profession">{{ profession }}</p>
          <p v-if="email" class="text-sm font-normal">{{ email }}</p>
        </h5>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  avatar: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  profession: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
})

const imageSource = ref(props.avatar)
</script>
