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
          <span v-if="!imageSource" class="text-3xl font-bold">
            {{ avatar }}
          </span>
        </div>
      </div>

      <div v-if="name || profession || email" class="space-y-2">
        <h3 v-if="name" class="text-2xl text-center font-bold capitalize">
          {{ name }}
        </h3>
        <h5
          v-if="profession || email"
          class="text-base text-center font-semibold"
        >
          <p v-if="profession" class="uppercase">{{ profession }}</p>
          <p v-if="location" class="text-sm font-normal">{{ location }}</p>
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
  location: {
    type: String,
    default: '',
  },
})

const imageSource = ref(props.avatar)
</script>
