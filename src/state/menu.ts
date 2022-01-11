/**
 * This is a store that hold left panel state
 * It could be one of the ActivePanelId
 *
 * Using useStorage from @vueuse/core allow persistance storage accross tabs/sessions
 *
 * We can import and set activePanel anywhere in our project
 * @see /src/components/partials/toolbars/Toolbar.vue
 * @see /src/components/partials/panels/ActivityPanel.vue
 */

import { useStorage } from "@vueuse/core"

type MenuPanel = "none" | "factura" | "boleta" | "venta" | "credito" | "debito" | "cotizacion" | "pedido" | "remision"

export const menuPanel = useStorage<MenuPanel>("menu-panel", "factura")
