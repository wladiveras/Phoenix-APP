<script setup lang="ts">
import { useHead } from "@vueuse/head"
import { pageTitle } from "/@src/state/navbarLayoutState"

const title = "Pedido #"

pageTitle.value = title
useHead({
    title: title + " - " + import.meta.env.VITE_APP_NAME,
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
