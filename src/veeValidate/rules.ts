import { localize, setLocale } from '@vee-validate/i18n'
import { defineRule, configure } from 'vee-validate'
import { required } from '@vee-validate/rules'

export const defineRules = () => {
  defineRule('required', required)

  configure({
    // Generates an English message locale generator
    // https://vee-validate.logaretm.com/v4/guide/i18n#global-message-generator

    generateMessage: localize({
      en: {
        messages: {
          required: 'This field is required',
        },
      },
      nl: {
        messages: {
          required: 'Dit veld is verplicht',
        },
      },
    }),
  })

  setLocale('nl')
}

export const scrollTo = () => {
  window.scrollTo(0, 300)
}
