<script setup lang="ts">
import { useHead } from "@vueuse/head"
import { pageTitle } from "/@src/state/navbarLayoutState"
import OrderList from "/@src/components/pages/dashboard/order/OrderList.vue"

const title = "Lista de Pedidos"

pageTitle.value = title
useHead({
    title: title + " - " + import.meta.env.VITE_APP_NAME,
})
</script>

<template>
    <NavbarSearchLayout theme="fade">
        <!-- Content Wrapper -->
        <div class="page-content-inner">
            <OrderList />
        </div>
    </NavbarSearchLayout>
</template>
