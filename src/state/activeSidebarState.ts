import { ref, watchEffect } from "vue"

type SidebarId = "none" | "messages" | "layouts" | "home" | "components" | "elements"

export const activeSidebar = ref<SidebarId>("none")

export function toggleSidebar(sidebar: SidebarId) {
    if (activeSidebar.value === sidebar) {
        activeSidebar.value = "none"
    } else {
        activeSidebar.value = sidebar
    }
}
