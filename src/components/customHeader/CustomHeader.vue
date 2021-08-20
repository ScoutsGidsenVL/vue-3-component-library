<template>
  <div>
    <h2 v-if="type === 'h2'" class="font-semibold text-xl leading-9 pt-3 pb-3">{{ text }}</h2>
    <h3 v-if="type === 'h3'" class="text-lg font-extrabold leading-5 pt-4 pb-1">{{ text }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomHeadline3',
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
})
</script>
