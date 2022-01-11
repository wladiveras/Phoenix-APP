<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

import useNotyf from "/@src/composable/useNotyf"
import { useStore } from "vuex"

const isLoading = ref(false)
const router = useRouter()
const notif = useNotyf()
const store = useStore()

const handleLogout = async () => {
    store
        .dispatch("logout")
        .then((response) => {
            isLoading.value = true
            notif.success("Até a proxima")
            router.push("/auth")
        })
        .catch((error) => {
            notif.error("Não foi possível se conectar, verifique os dados e tente novamente")
        })
        .finally(() => (isLoading.value = false))
}
</script>

<template>
    <V-Dropdown right spaced class="user-dropdown profile-dropdown">
        <template #button="{ toggle }">
            <a class="is-trigger dropdown-trigger" aria-haspopup="true" @click="toggle">
                <V-Avatar picture="/demo/avatars/8.jpg" />
            </a>
        </template>

        <template #content>
            <div class="dropdown-head">
                <V-Avatar size="large" picture="/demo/avatars/8.jpg" />

                <div class="meta">
                    <span>{{ store.getters.user.name }}</span>
                    <span>Cliente Prime</span>
                </div>
            </div>

            <a href="#" role="menuitem" class="dropdown-item is-media">
                <div class="icon">
                    <i aria-hidden="true" class="lnil lnil-user-alt"></i>
                </div>
                <div class="meta">
                    <span>Perfil</span>
                    <span>Visitar seu perfil</span>
                </div>
            </a>

            <hr class="dropdown-divider" />

            <a href="#" role="menuitem" class="dropdown-item is-media">
                <div class="icon">
                    <i aria-hidden="true" class="lnil lnil-briefcase"></i>
                </div>
                <div class="meta">
                    <span>Pedidos</span>
                    <span>Historico de Pedidos</span>
                </div>
            </a>

            <hr class="dropdown-divider" />

            <a href="#" role="menuitem" class="dropdown-item is-media">
                <div class="icon">
                    <i aria-hidden="true" class="lnil lnil-cog"></i>
                </div>
                <div class="meta">
                    <span>Configurações</span>
                    <span>Configurações da Conta</span>
                </div>
            </a>

            <hr class="dropdown-divider" />
            <form @submit.prevent="handleLogout">
                <div class="dropdown-item is-button">
                    <V-Button
                        :loading="isLoading"
                        class="logout-button"
                        icon="feather:log-out"
                        color="primary"
                        role="menuitem"
                        type="submit"
                        raised
                        fullwidth
                    >
                        Desconectar
                    </V-Button>
                </div>
            </form>
        </template>
    </V-Dropdown>
</template>
