<template>
  <label v-if="rules.includes('required') || rules.includes('customRequired')" class="text-red ml-1">*</label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Required',
  props: {
    rules: {
      type: [Object, String, Function],
      default: '',
      required: false
    }
  }
})
</script>
