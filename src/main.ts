/**
 * This is your client vue app entrypoint
 * Its loaded because it is referenced in the vite
 * entrypoint file (index.html located at the root of this project)
 *
 * External css/js files will be loaded as dependencies.
 * You may want to check the vite configuration.
 * Some plugins will register virtual components or lazyload other for us.
 *
 * @see /index.html
 * @see /vite.config.ts
 */

import { createApp } from "./app"
import VCalendar from "v-calendar"
import VueMultiselect from "@vueform/multiselect"
import VueSlider from "@vueform/slider"
import VueApexCharts from "vue3-apexcharts"
import VueCKEditor from "@ckeditor/ckeditor5-vue"
import VueTippy from "vue-tippy"
import VueTheMask from "vue-the-mask"

import hasNestedRouterLink from "./directives/has-nested-router-link"
import background from "./directives/background"
import tooltip from "./directives/tooltip"

/**
 * Importing external libraries allow to compile them in our bundle
 * How files are interpreted is defined by the extension.
 */
import "simplebar"
import "@purge-icons/generated"
import "nprogress/nprogress.css"
import "@vueform/multiselect/themes/default.scss"
import "@vueform/slider/themes/default.scss"
import "simplebar/dist/simplebar.css"
import "tiny-slider/src/tiny-slider.scss"
import "notyf/notyf.min.css"
import "tippy.js/dist/tippy.css"
import "tippy.js/dist/svg-arrow.css"
import "tippy.js/dist/border.css"
import "tippy.js/dist/backdrop.css"
import "tippy.js/themes/light.css"

import "./scss/vendors/font-awesome-v5.css"
import "./scss/vendors/line-icons-pro.css"
import "./scss/vendors/prism-coldark-cold.css"

import "./scss/main.scss"

/**
 * We create our app and mount it when it is ready
 *
 * @see /@src/app.ts for more detailed informations
 */
createApp({
    async enhanceApp(app) {
        app.use(VCalendar)
        app.use(VueApexCharts)
        app.use(VueCKEditor)
        app.use(VueTheMask)
        app.use(VueTippy, {
            defaultProps: {
                theme: "light",
            },
        })

        app.component(VueMultiselect.name, VueMultiselect)
        app.component(VueSlider.name, VueSlider)

        app.directive("has-nested-router-link", hasNestedRouterLink)
        app.directive("background", background)
        app.directive("tooltip", tooltip)
    },
}).then(app => app.mount("#app"))
