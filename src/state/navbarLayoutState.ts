/**
 * This is a store that hold which layout component is used on /navbar subpages
 *
 * Using defineAsyncComponent from vue allow to lazyload component only when they are used
 *
 * We can import and use navbarLayout anywhere in our project
 * @see /src/components/navigation/desktop/navbar/NavbarLayoutSwitcher.vue
 * @see /src/pages/navbar/dashboards.vue
 * @see /src/pages/navbar/layouts.vue
 */

import { computed, ref, defineAsyncComponent } from "vue"

const NavbarSearchLayout = defineAsyncComponent(() => import("/@src/layouts/NavbarSearchLayout.vue"))
const layoutsComponents = {
    "navbar-clean": NavbarSearchLayout,
    "navbar-clean-center": NavbarSearchLayout,
    "navbar-clean-fade": NavbarSearchLayout,
}

export const navbarLayoutId = ref<keyof typeof layoutsComponents>("navbar-clean")
export const navbarLayoutComponent = computed(() => {
    return layoutsComponents[navbarLayoutId.value] || NavbarSearchLayout
})
export const navbarLayoutTheme = computed(() => {
    switch (navbarLayoutId.value) {
        case "navbar-clean-fade":
            return "fade"
        case "navbar-clean-center":
            return "center"
        default:
            return "default"
    }
})
export const pageTitle = ref("Welcome")
