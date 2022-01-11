<script setup lang="ts">
import { useHead } from "@vueuse/head"
import { pageTitle } from "/@src/state/navbarLayoutState"
import useUserSession from "/@src/composable/useUserSession"
import { useRoute, useRouter } from "vue-router"
import { onBeforeMount, onUpdated, onUnmounted } from "vue"

const title = "Pedido #313"

pageTitle.value = title
useHead({
    title: title + " - " + import.meta.env.VITE_APP_NAME,
})
</script>

<template>
    <NavbarSearchLayout theme="fade">
        <!-- Content Wrapper -->
        <div class="page-content-inner">
            <OrderDetail :route-data="route" />
        </div>
    </NavbarSearchLayout>
</template>
