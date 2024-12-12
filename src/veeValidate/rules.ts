import { localize, setLocale } from '@vee-validate/i18n'
import { defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'

export const defineRules = () => {
  defineRule('required', required)
  defineRule('email', email)

  configure({
    // Generates an English message locale generator
    // https://vee-validate.logaretm.com/v4/guide/i18n#global-message-generator

    generateMessage: localize({
      en: {
        messages: {
          required: 'This field is required',
          email: 'Not a valid email',
        }
      },
      nl: {
        messages: {
          required: 'Dit veld is verplicht',
          email: 'Geen geldig email'
        }
      }
    })
  })

  // KAMPVISUM

  defineRule('minimumOneSection', (value: Array<string>) => {
    if (value.length === 0) {
      return 'Selecteer er minstens 1.'
    }

    return true
  })

  defineRule('oneSection', (value: Array<string>) => {
    if (value.length === 0) {
      return 'Selecteer 1 tak.'
    } else if (1 < value.length) {
      return 'Selecteer 1 tak. Maak een apart kamp voor elke tak.'
    }

    return true
  })

  setLocale('nl')
}

export const scrollTo = () => {
  window.scrollTo(0, 300)
}
