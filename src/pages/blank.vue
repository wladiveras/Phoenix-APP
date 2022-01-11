<script setup lang="ts">
import { useHead } from "@vueuse/head"
import { pageTitle } from "/@src/state/navbarLayoutState"

const title = "Blank"

pageTitle.value = title
useHead({
    title: title + " - " + import.meta.env.VITE_APP_NAME,
})
</script>

<template>
    <NavbarSearchLayout theme="fade">
        <!-- Content Wrapper -->
        <div class="page-content-inner">
            <!--
        Page content goes here

        You can see pages content samples from 
        files in /src/components/pages directory
      -->
            <div style="color: red">BEM VINDO A PAGINA DO ADMINISTRADOR</div>
            <!-- <div v-if="x.can('card.edit')" style="color: red">
        Suas permissões
        <ul v-for="permission in x.permissions" :key="permission">
          <li>{{ permission }}</li>
        </ul>
      </div> -->
        </div>
    </NavbarSearchLayout>
</template>
