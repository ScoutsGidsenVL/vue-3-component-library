<template>
  <div>
    <strong v-if="!hideInput && label">
      <p>
        {{ label }}
        <required :rules="rules" />
      </p>
    </strong>
    <div v-if="extraInfo" style="font-size: 13px">
      <label>{{ extraInfo }}</label>
    </div>
    <div>
      <slot />
    </div>
    <div
      :class="{
        'text-lightGray animate-pulse2 bg-lightGray': isSubmitting
      }"
    >
      <input
        v-if="type !== InputTypes.TEXT_AREA && !hideInput && type !== InputTypes.TIME"
        v-model="inputValue"
        class="bg-lightGray p-2 min-w-0 w-100"
        :min="min"
        :type="type"
        step="1"
        :maxlength="maxlength"
        :name="name"
        :class="{ 'opacity-0': isSubmitting }"
        :disabled="disabled || isSubmitting"
        :placeholder="placeholder"
      />

      <input
        v-if="type === InputTypes.TIME"
        :id="name"
        v-model="inputValue"
        class="bg-lightGray p-2 min-w-0 w-100"
        style="max-width: 100px"
        type="time"
        :name="name"
        :class="{ 'opacity-0': isSubmitting }"
        :disabled="disabled || isSubmitting"
        :step="step"
      />
    </div>
    <textarea
      v-if="type === InputTypes.TEXT_AREA && !hideInput && type !== InputTypes.TIME"
      v-model="inputValue"
      class="bg-lightGray p-2 h-32"
      :class="'md:' + textAreaWidth + ' ' + 'xs:w-full'"
      :type="'text'"
      :name="name"
      maxlength="500"
      :disabled="disabled || isSubmitting"
    />
    <span :name="name">
      <ErrorMessage :name="name" class="text-red text-sm block mt-1 w-80" />
    </span>
  </div>
</template>

<script lang="ts">
import { ErrorMessage, FieldContext, useField } from 'vee-validate'
import { InputTypes } from '../../enums/inputTypes'
import { defineComponent, PropType, watch } from 'vue'
import Required from '../required/Required.vue'
import { required } from '@vee-validate/rules'
import { defineRule, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'

export default defineComponent({
  name: 'CustomInput',
  components: {
    ErrorMessage,
    Required
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: InputTypes.TEXT
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String, Function],
      default: '',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: String,
      required: false,
      default: ''
    },
    maxlength: {
      type: String,
      required: false,
      default: '1000'
    },
    extraInfo: {
      type: String,
      required: false
    },
    hideInput: {
      type: Boolean,
      default: false,
      required: false
    },
    loadingSubmit: {
      type: Boolean,
      default: false,
      required: false
    },
    onInvalid: {
      type: String,
      default: '',
      required: false
    },
    textAreaWidth: {
      type: String,
      required: false,
      default: 'w-96'
    },
    placeholder: {
      type: String,
      required: false
    },
    step: {
      type: String,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const { value: inputValue } = useField(props.name, props.rules, {
      initialValue: props.value
    })

    const cardNumberSpace = () => {
      if (props.name === 'victim.bankAccount') {
        inputValue.value = inputValue.value
          .replace(/[^\dA-Z]/g, '')
          .replace(/(.{4})/g, '$1 ')
          .trim()
      }
    }

    watch(
      () => inputValue.value,
      () => {
        cardNumberSpace()
      }
    )

    return {
      InputTypes,
      inputValue
    }
  }
})
</script>
