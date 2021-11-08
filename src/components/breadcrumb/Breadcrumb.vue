<template>
        <nav role="navigation" aria-labelledby="system-breadcrumb" class="breadcrumb-wrapper__nav">
          <h2 id="system-breadcrumb" class="visually-hidden">Kruimelpad</h2>
          <ol class="flex justify-between">
            <div class="breadcrumb">
              <!-- HOME -->
              <li class="breadcrumb-item cursor-pointer" @click="navigateHome()">
                <a class="breadcrumb-item--home flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g data-name="Layer 2">
                      <path
                        d="M20.42 10.18L12.71 2.3a1 1 0 00-1.42 0l-7.71 7.89A2 2 0 003 11.62V20a2 2 0 001.89 2h14.22A2 2 0 0021 20v-8.38a2.07 2.07 0 00-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 00-1-1H9a1 1 0 00-1 1v7H5v-8.42l7-7.15 7 7.19z"
                        data-name="home"
                      ></path>
                    </g>
                  </svg>
                  <span class="ml-1 d-none d-lg-inline-block">Home</span>
                </a>
              </li>
              <!-- CRUMBS -->
              <li v-for="breadcrumb in breadcrumbs" @click="navigateToCrumb(breadcrumb)" :key="breadcrumb" class="breadcrumb-item active cursor-pointer">
                <a v-if="breadcrumb && breadcrumb.crumb">{{ breadcrumb.crumb }}</a>
              </li>
            </div>
            <div class="pr-2">
                <!-- WIFI ON  -->
                <svg v-if="isInternetActive" class="fill-current text-green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                  <g data-name="Layer 99">
                    <path
                      d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z"
                      data-name="wifi"
                    ></path>
                  </g>
                </svg>
                <!-- WIFI OFF -->
                <svg v-else class="fill-current text-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                  <g data-name="Layer 100">
                    <path
                      d="M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z"
                      data-name="wifi-off"
                    ></path>
                  </g>
                </svg>
            </div>
          </ol>
        </nav>
</template>

<script lang="ts">
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { defineComponent, PropType, ref, watch } from 'vue'

export interface breadcrumb {
  crumb?: string
  uuid?: string
}

export default defineComponent({
  name: 'BreadCrumb',
  props: {
    home: {
      type: String,
      required: false,
      default: '/'
    },
    route: {
      type: Object as PropType<RouteLocationNormalizedLoaded>,
      required: true
    },
    router: {
      type: Object as PropType<Router>,
      required: true
    },
    isInternetActive: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props) {
    const route = props.route
    const breadcrumbs = ref<breadcrumb[]>([])

    const navigateHome = () => {
      props.router.push(props.home)
    }

    const navigateToCrumb = (selectedBreadcrumb: breadcrumb) => {
      let link: string = ''

      for (let i = 0; i < breadcrumbs.value.length; i++) {
        link += '/' + breadcrumbs.value[i].crumb + '/' + (breadcrumbs.value[i].uuid ? breadcrumbs.value[i].uuid : '')
        if (breadcrumbs.value[i].crumb === selectedBreadcrumb.crumb) {
          break
        }
      }
      props.router.push(link)
    }

    watch(
      () => route.path,
      () => {
        breadcrumbs.value = []

        let splittedValues = route.path.split('/')
        let t: breadcrumb = {}

        const regexHasNumber = /\d/

        splittedValues.forEach((splittedValue) => {
          if (splittedValue.length > 0) {
            if (!regexHasNumber.test(splittedValue)) {
              t.crumb = splittedValue
            }
            if (regexHasNumber.test(splittedValue)) {
              t.uuid = splittedValue
              breadcrumbs.value.push({ crumb: t.crumb, uuid: t.uuid })
              console.log('breadcrumbs: ', breadcrumbs.value)
            }
          }
        })
      }
    )

    return {
      route,
      breadcrumbs,
      navigateHome,
      navigateToCrumb
    }
  }
})
</script>
