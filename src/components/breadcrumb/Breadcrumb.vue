<template>
        <nav role="navigation" aria-labelledby="system-breadcrumb" class="breadcrumb-wrapper__nav">
          <h2 id="system-breadcrumb" class="visually-hidden">Kruimelpad</h2>
          <ol class="breadcrumb">
            <!-- HOME -->
            <li class="breadcrumb-item cursor-pointer" @click="navigateHome()">
              <a class="breadcrumb-item--home flex">
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
          </ol>
        </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'

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
