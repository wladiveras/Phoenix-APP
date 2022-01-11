<script setup lang="ts">
import { useHead } from "@vueuse/head"
import { pageTitle } from "/@src/state/navbarLayoutState"

import axios, { AxiosInstance } from "axios"

import { useStore } from "vuex"
import { computed } from "vue"
import { mapGetters, mapActions } from "vuex"

const store = useStore()

const title = "Inicio"

const test = computed(() => store.state.session.hash)

const RefreshToken = async () => {
    store.dispatch("refreshTokens")
}

const TestAccess = async () => {
    store.dispatch("testAccess")
}

pageTitle.value = title
useHead({
    title: title + " - " + import.meta.env.VITE_APP_NAME,
})
</script>

<template>
    <NavbarSearchLayout theme="fade">
        <!-- Content Wrapper -->
        <div class="page-content-inner">
            <!-- SOURCE -->
            <button @click="RefreshToken">Refresh Token</button>
            <button @click="TestAccess">Check Request</button>
            <!-- OUTPUT -->
        </div>
    </NavbarSearchLayout>
</template>

<route lang="yaml">
meta:
    requiresAuth: true
    isAdmin: true
</route>
