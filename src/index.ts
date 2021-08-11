// COMPONENTS
import CustomInput from './components/inputs/CustomInput.vue'
import BasePage from './components/basePage/BasePage.vue'
import PageTitle from './components/pageTitle/PageTitle.vue'
import CustomButton from './components/customButton/CustomButton.vue'
import BaseSideBar from './components/baseSideBar/BaseSideBar.vue'

// TYPES
import { sideBarState } from './types/sideBarState'

// INTERFACES
import { option } from './interfaces/option'

// ENUMS
import { InputTypes } from './enums/inputTypes'

//VEE VALIDATE
import { defineRules } from './veeValidate/rules'
import { scrollToFirstError, useFormSendWithSuccess, useScrollToTop } from './veeValidate/helpers'

export {
  CustomInput,
  BasePage,
  PageTitle,
  CustomButton,
  BaseSideBar,
  sideBarState,
  option,
  InputTypes,
  defineRules,
  scrollToFirstError,
  useFormSendWithSuccess,
  useScrollToTop
}
