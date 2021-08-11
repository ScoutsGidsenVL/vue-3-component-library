<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasePage'
})
</script>

<style>
html {
  scroll-behavior: auto !important;
}

@media (min-width: 0px) and (max-width: 640px) {
  .container {
    max-width: 100% !important;
  }
}
</style>
