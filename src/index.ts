// CSS
import './index.css'
import './css/scouts1.css'
import './css/scouts2.css'
import './css/scouts3.css'
import './css/scouts4.css'
import './css/scouts5.css'

// COMPONENTS
import CustomButton from './components/customButton/CustomButton.vue'
import BaseSideBar from './components/baseSideBar/BaseSideBar.vue'
import CustomInput from './components/inputs/CustomInput.vue'
import PageTitle from './components/pageTitle/PageTitle.vue'
import BasePage from './components/basePage/BasePage.vue'
import Warning from './components/modals/Warning.vue'
import Loader from './components/loader/Loader.vue'
import SuccessToast from './components/toast/SuccessToast.vue'
import Required from './components/required/Required.vue'

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
  useFormSendWithSuccess,
  scrollToFirstError,
  useScrollToTop,
  CustomButton,
  sideBarState,
  CustomInput,
  BaseSideBar,
  defineRules,
  InputTypes,
  PageTitle,
  BasePage,
  option,
  Loader,
  Warning,
  SuccessToast,
  Required
}
