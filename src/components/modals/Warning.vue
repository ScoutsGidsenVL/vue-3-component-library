<template>
  <div v-if="isDisplayed" class="h-full w-full fixed top-0 left-0 overflow-x-hidden bg-black bg-opacity-20 custom-index">
    <div class="flex h-screen justify-center items-center">
      <div class="align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pb-4 sm:p-6 sm:pb-4" :class="leftButton || rightButton ? 'pt-5' : 'mt-2'">
          <div class="sm:flex sm:items-start">
            <div :class="title && 'mt-2'" class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-lightRed sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg text-left leading-6 font-medium text-darkGray" id="modal-title">
                {{ title }}
              </h3>
              <div>
                <p class="text-sm text-left text-darkGray">
                  {{ text }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="leftButon || rightButton" class="bg-gray px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
          <custom-button v-if="rightButton" @click="rightButtonClicked()" class="w-full inline-flex justify-center sm:w-auto" :text="rightButton" />
          <custom-button v-if="leftButton" @click="leftButtonClicked()" class="w-full inline-flex justify-center sm:w-auto" :text="leftButton" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CustomButton from '../customButton/CustomButton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Warning',
  components: {
    'custom-button': CustomButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isDisplayed: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: 'red'
    },
    leftButton: {
      type: String,
      required: false
    },
    rightButton: {
      type: String,
      required: false
    }
  },
  emits: ['leftButtonClicked', 'rightButtonClicked'],
  setup(props, context) {
    const rightButtonClicked = () => {
      context.emit('rightButtonClicked', true)
    }

    const leftButtonClicked = () => {
      context.emit('leftButtonClicked', true)
    }

    return {
      rightButtonClicked,
      leftButtonClicked
    }
  }
})
</script>

<style scoped>
custom-index {
  z-index: 9999999;
}
</style>
