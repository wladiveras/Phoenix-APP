import { createApp as createClientApp, h, VNode, resolveDynamicComponent, Transition, provide, ref, App } from "vue"

import { useStorage } from "@vueuse/core"
import { RouterView } from "vue-router"
import { createHead } from "@vueuse/head"
import { createI18n } from "./i18n"
import { createRouter } from "./router"
import Axios from "axios"

import jwtDecode, { JwtPayload } from "jwt-decode"
import useNotyf from "/@src/composable/useNotyf"
import store from "/@src/store"

type PhoenixAppOptions = {
    enhanceApp?: (app: App) => Promise<void>
}

export async function createApp({ enhanceApp }: PhoenixAppOptions) {
    const head = createHead()
    const i18n = createI18n()
    const router = createRouter()
    const notif = useNotyf()

    const app = createClientApp({
        // This is the global app setup function
        setup() {
            //provide(apiSymbol, api)

            return () => {
                const defaultSlot = ({ Component: _Component }: any) => {
                    const Component = resolveDynamicComponent(_Component) as VNode

                    return [
                        h(
                            Transition,
                            { name: "fade-slow", mode: "out-in" },
                            {
                                default: () => [h(Component)],
                            },
                        ),
                    ]
                }

                return h(RouterView, null, {
                    default: defaultSlot,
                })
            }
        },
    })

    router.beforeEach((to, from, next) => {
        // Disable route if user is not logged in
        const publicPages = ["/auth", "/auth/login", "/register", "/home"]
        const authRequired = !publicPages.includes(to.path)
        const loggedIn = store.getters.isLoggedIn

        if (authRequired && !loggedIn) {
            next("/auth")
            notif.error("Desculpe, mas você precisa se conectar primeiro para acessar essa pagina.")
        } else {
            next()
        }
    })

    app.use(head)
    app.use(router)
    app.use(store)
    app.use(i18n)

    if (enhanceApp) {
        await enhanceApp(app)
    }

    return app
}
