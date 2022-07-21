<template>
  <div>
    <ul class="list-none m-0 p-0">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="relative mb-1 pb-1"
      >
        <div
          v-if="!(index >= items.length - 1)"
          class="border-r border-gray-400 absolute h-full mt-1 left-1.5 top-2"
        ></div>
        <div class="flex items-start mb-1">
          <div
            class="rounded-full h-2.5 w-2.5 z-10 mt-2 ml-0.5"
            :class="[
              [
                index === 0
                  ? 'ring-2 ring-current text-primary bg-primary text-opacity-50'
                  : 'bg-gray-500',
              ],
            ]"
          ></div>
          <div
            class="flex-1 ml-2 font-medium"
            :class="{
              'text-primary': index === 0,
            }"
          >
            {{ item.content }}
          </div>
        </div>
        <div
          class="ml-5 text-xs"
          :class="[[index === 0 ? 'text-primary' : '']]"
        >
          {{ item.date }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
