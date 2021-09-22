<template>
  <button
    :disabled="disabled || isSubmitting"
    class="btn-simple-dark "
    :type="type"
    :class="{
      ' animate-pulse2 loading': isSubmitting
    }"
  >
    <a class="btn-simple-dark  mt-0 relative" :class="extraStyle">
      <span :class="{ 'opacity-0': isSubmitting }">{{ text }}</span>
      <slot name="icon" />
      <div v-show="isSubmitting" class="absolute flex justify-center items-center w-full left-0 top-0 h-full">
        <loader size="5" :is-loading="isSubmitting" />
      </div>
    </a>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Loader from '../loader/Loader.vue'

export default defineComponent({
  name: 'CustomButton',
  components: {
    loader: Loader
  },
  props: {
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      default: 'submit',
      required: false
    },
    isSubmitting: {
      type: Boolean,
      default: false,
      required: false
    },
    hoverColor: {
      type: String,
      required: false,
      default: 'green'
    },
    extraStyle: {
      type: String,
      required: false,
      default: ''
    }
  }
})
</script>
<style scoped>
.loading a {
  background-color: #7b8f1c;
}
</style>
