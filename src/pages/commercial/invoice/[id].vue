<script setup lang="ts">
import { useHead } from "@vueuse/head"
import { useRoute, useRouter } from "vue-router"
import { pageTitle } from "/@src/state/navbarLayoutState"
import useUserSession from "/@src/composable/useUserSession"

const router = useRouter()
const route = useRoute().params
const session = useUserSession()

const title = "Pedido #" + route.id

pageTitle.value = title
useHead({
    title: session.user.name + " - " + title + " - " + import.meta.env.VITE_APP_NAME,
})
</script>

<template>
    <NavbarSearchLayout theme="fade">
        <!-- Content Wrapper -->
        <div class="page-content-inner">
            <CommercialInvoice />
        </div>
    </NavbarSearchLayout>
</template>
