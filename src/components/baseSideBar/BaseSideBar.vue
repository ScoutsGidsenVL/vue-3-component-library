<template>
  <div>
    <div v-if="isDisplay" class="h-full w-full fixed top-0 left-0 overflow-x-hidden bg-black bg-opacity-20" @click="hideSideBar()"></div>

    <div :class="{ 'd-flex': isDisplay, 'd-none': !isDisplay }" class="bg-white fixed flex-col top-0 right-0 h-full z-20 xs:w-11/12 sm:w-11/12 md:w-100 max-w-md">
      <div class="px-4 pb-2 pt-3 custom-background">
        <div class="mb-4 cursor-pointer" @click="hideSideBar()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path
              d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
            />
          </svg>
        </div>
        <h1 class="group-search__title mb-3 mt-0 inline-block relative text-xl my-background" style="font-size: 2rem; position: initial; transition: none !important">
          <span class="animate-none">{{ title }}</span>
        </h1>
        <form v-if="options && !isEdit" action="">
          <div class="flex gap-7">
            <div v-for="option in options" :key="option">
              <input
                :id="option.value + name"
                v-model="selected"
                class="cursor-pointer"
                type="radio"
                :name="option.value + name"
                :value="option.value + name"
                @change="emitOption()"
              />
              <label :for="option.value + name" class="ml-2">{{ option.text }}</label>
            </div>
          </div>
        </form>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'BaseSideBar',
  props: {
    title: {
      type: String,
      required: true
    },
    isDisplay: Boolean,
    selection: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array as PropType<Array<String>>,
      required: false
    },
    width: {
      type: String,
      default: 'w-2/5',
      required: false
    },
    isEdit: Boolean,
    name: String,
    isOverflowHidden: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props, context) {
    const selected = ref<string>(props.selection)
    const { isDisplay, selection } = toRefs(props)

    const hideSideBar: () => void = () => {
      context.emit('update:isDisplay', false)
      context.emit('hideSidebar')
    }

    const emitOption = () => {
      context.emit('options', selected.value)
    }

    watch(selection, (value: string) => {
      selected.value = value
    })

    watch(isDisplay, (value: boolean) => {
      if (props.isOverflowHidden === true) {
        if (value == true) {
          document.body.classList.add('overflow-hidden')
        } else {
          document.body.classList.remove('overflow-hidden')
        }
      }
    })

    return {
      hideSideBar,
      emitOption,
      selected
    }
  }
})
</script>

<style scoped>
header {
  background: #f9f9f9 url(/bg-texture-small.jpg) no-repeat;
  background-size: cover;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  display: block;
  position: sticky;
  top: 0;
}

.group-search__title:before {
  animation: backgroundReveal 0s 0s both;
}

.group-search__title:after {
  animation: backgroundReveal 0s 0s both;
}

.group-search__title span {
  animation: fadeIn 0s 0s both;
}

.custom-background {
  background: #f9f9f9 url(/bg-texture-small.jpg);
}
.my-background {
  background-color: red;
}
</style>
