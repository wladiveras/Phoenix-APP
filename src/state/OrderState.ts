/**
 * This is a store that hold all state used on /wizard-v1 multi-step form
 *
 * Using defineAsyncComponent from vue allow to lazyload component only when they are used
 *
 * We can import and use sidebarLayout anywhere in our project
 * @see /src/components/partials/wizard/WizardV1Step1.vue
 * @see /src/components/partials/wizard/WizardV1Step7.vue
 */

import { reactive, ref, computed } from "vue"
import sleep from "/@src/utils/sleep"

/**
 * Using typescript types allow better developer experience
 * with autocompletion and compiler error prechecking
 */
import type { orderData } from "/@src/models/order"

export const currentStep = ref(1)
export const isLoading = ref(false)

export const stepTitle = computed(() => {
    switch (currentStep.value) {
        case 2:
            return "Project Info"
        case 3:
            return "Project Detai2ls"
        case 4:
            return "Project Files"
        case 5:
            return "Team Members"
        case 6:
            return "Project Tools"
        case 7:
            return "Preview"
        case 8:
            return "Finish"
        case 1:
        default:
            return "Project Type"
    }
})

export async function saveData() {
    isLoading.value = true
    await sleep(2000)
    isLoading.value = false
}

export function resetData() {
    orderData.name = ""
    orderData.description = ""
    orderData.relatedTo = "UX/Design"
    orderData.logo = null
    orderData.timeFrame = {
        start: new Date(),
        end: new Date(),
    }
    orderData.budget = "< 5K"
    orderData.attachments = []
    orderData.teammates = []
    orderData.tools = []
    orderData.customer = null
}

export const orderData = reactive<orderData>({
    name: "",
    description: "",
    relatedTo: "UX/Design",
    logo: null,
    timeFrame: ref({
        start: new Date(),
        end: new Date(),
    }),
    budget: "< 5K",
    attachments: [],
    teammates: [],
    tools: [],
    customer: null,
})
