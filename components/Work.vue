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
        <div class="flex items-start">
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
            class="flex-1 ml-2 font-medium space-x-2"
            :class="{
              'text-primary': index === 0,
            }"
          >
            <span>
              {{ item.company_name }}
            </span>
            <span>&#8212;</span>
            <span class="text-xs italic">
              {{ item.time_period }}
            </span>
          </div>
        </div>
        <div
          class="ml-5 leading-none"
          :class="[[index === 0 ? 'text-primary' : '']]"
        >
          <p>
            <span class="text-sm font-semibold">
              {{ item.job_role }}
            </span>
          </p>
          <p>
            <span class="text-sm">
              {{ item.location }}
            </span>
          </p>

          <content-renderer
            v-if="!short"
            class="text-sm mt-3 prose prose-sm"
            :class="{
              'text-primary': index === 0,
            }"
            :value="item"
          ></content-renderer>
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
  short: {
    type: Boolean,
    default: false,
  },
})
</script>
