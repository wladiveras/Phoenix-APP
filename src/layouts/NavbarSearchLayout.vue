<script setup lang="ts">
import type { PropType } from "vue"
import { ref, computed, watch } from "vue"
import { useRoute } from "vue-router"
import { popovers } from "/@src/data/users/userPopovers"
import { pageTitle } from "/@src/state/navbarLayoutState"
import { activePanel } from "/@src/state/activePanelState"
import { format, formatRelative, subDays } from "date-fns"
import { useI18n } from "vue-i18n"
import { enUS, ptBR } from "date-fns/locale"
const { locale, t } = useI18n()

type NavbarSearchTheme = "default" | "center" | "fade"

const props = defineProps({
    theme: {
        type: String as PropType<NavbarSearchTheme>,
        default: "default",
    },
    nowrap: {
        type: Boolean,
        default: false,
    },
})
const isMobileSidebarOpen = ref(false)
const activeMobileSubsidebar = ref("dashboard")

const route = useRoute()
const filter = ref("")
const filteredData = computed(() => {
    if (!filter.value) {
        return []
    }

    return Object.values(popovers).filter((user) => {
        return user.fullName.match(new RegExp(filter.value, "i")) || user.position.match(new RegExp(filter.value, "i"))
    })
})

const dateTime = ref()

setInterval(() => {
    dateTime.value = format(new Date(), "MMMM dd, yyyy - H:M:ss", {
        locale: locale.value === "pt-BR" ? ptBR : enUS,
    })
}, 1000)

const users = [
    {
        id: 5,
        picture: "/demo/avatars/12.jpg",
        initials: "JS",
        color: "info",
    },
    {
        id: 22,
        picture: "/demo/avatars/22.jpg",
        initials: "JH",
        color: "info",
    },
    {
        id: 40,
        picture: "/demo/avatars/40.jpg",
        initials: "SM",
        color: "h-purple",
    },
]
watch(
    () => route.fullPath,
    () => {
        isMobileSidebarOpen.value = false
    },
)
</script>

<template>
    <div class="navbar-layout navbar-layout-search">
        <div class="app-overlay"></div>

        <!-- Mobile navigation -->
        <MobileNavbar :is-open="isMobileSidebarOpen" @toggle="isMobileSidebarOpen = !isMobileSidebarOpen">
            <template #brand>
                <RouterLink :to="{ name: 'index' }" class="navbar-item is-brand">
                    <AnimatedLogo width="38px" height="38px" />
                </RouterLink>

                <div class="brand-end">
                    <NotificationsMobileDropdown />
                    <UserProfileDropdown />
                </div>
            </template>
        </MobileNavbar>

        <!-- Mobile sidebar links -->
        <MobileSidebar :is-open="isMobileSidebarOpen" @toggle="isMobileSidebarOpen = !isMobileSidebarOpen">
            <template #links>
                <li>
                    <a
                        :class="[activeMobileSubsidebar === 'dashboard' && 'is-active']"
                        @click="activeMobileSubsidebar = 'dashboard'"
                    >
                        <i aria-hidden="true" class="iconify" data-icon="feather:activity"></i>
                    </a>
                </li>
                <li>
                    <a
                        :class="[activeMobileSubsidebar === 'layout' && 'is-active']"
                        @click="activeMobileSubsidebar = 'layout'"
                    >
                        <i aria-hidden="true" class="iconify" data-icon="feather:grid"></i>
                    </a>
                </li>
            </template>

            <template #bottom-links>
                <li>
                    <a @click="activePanel = 'search'">
                        <i aria-hidden="true" class="iconify" data-icon="feather:search"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i aria-hidden="true" class="iconify" data-icon="feather:settings"></i>
                    </a>
                </li>
            </template>
        </MobileSidebar>

        <!-- Mobile subsidebar links -->
        <transition name="slide-x">
            <LayoutsMobileSubsidebar v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'layout'" />
            <DashboardsMobileSubsidebar v-else-if="isMobileSidebarOpen && activeMobileSubsidebar === 'dashboard'" />
        </transition>

        <!-- Desktop navigation -->
        <NavbarSearch :theme="props.theme">
            <!-- Custom navbar title -->
            <template #title>
                <RouterLink :to="{ name: 'index' }" class="brand">
                    <AnimatedLogo width="38px" height="38px" />
                </RouterLink>
                <div class="separator"></div>

                <ProjectsQuickDropdown />
                <h1 class="title is-6">{{ pageTitle }}</h1>
            </template>

            <template #subtitle>
                <span> {{ dateTime }} </span>
            </template>

            <!-- Custom navbar toolbar -->
            <template #toolbar>
                <Toolbar class="desktop-toolbar">
                    <ToolbarNotification />

                    <a class="toolbar-link right-panel-trigger" @click="activePanel = 'activity'">
                        <i aria-hidden="true" class="iconify" data-icon="feather:grid"></i>
                    </a>
                </Toolbar>
                <LanguagesPanel />
                <UserProfileDropdown />
            </template>

            <template #toolbar-bottom>
                <V-AvatarStack :avatars="users" :limit="3" size="small" />
                <V-Dropdown spaced right>
                    <template #button="{ open }">
                        <V-IconButton icon="feather:plus" circle @click="open" />
                    </template>
                    <template #content>
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i aria-hidden="true" class="lnil lnil-analytics-alt-1"></i>
                            </div>
                            <div class="meta">
                                <span>New Dashboard</span>
                                <span>Add a new dashboard</span>
                            </div>
                        </a>
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i aria-hidden="true" class="lnil lnil-users-alt"></i>
                            </div>
                            <div class="meta">
                                <span>Invite</span>
                                <span>Invite new members</span>
                            </div>
                        </a>
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i aria-hidden="true" class="lnil lnil-briefcase"></i>
                            </div>
                            <div class="meta">
                                <span>New Project</span>
                                <span>Add a new project</span>
                            </div>
                        </a>
                        <hr class="dropdown-divider" />
                        <a href="#" class="dropdown-item is-media">
                            <div class="icon">
                                <i aria-hidden="true" class="lnil lnil-cog"></i>
                            </div>
                            <div class="meta">
                                <span>Settings</span>
                                <span>Manage team settings</span>
                            </div>
                        </a>
                    </template>
                </V-Dropdown>
            </template>

            <!-- Custom navbar search -->
            <template #search>
                <div class="centered-search">
                    <div class="field">
                        <div class="control has-icon">
                            <input v-model="filter" type="text" class="input search-input" placeholder="Pesquisar..." />
                            <div class="form-icon">
                                <i aria-hidden="true" class="iconify" data-icon="feather:search"></i>
                            </div>
                            <div v-if="filter" class="form-icon is-right" @click="filter = ''">
                                <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
                            </div>
                            <div v-if="filteredData.length > 0" class="search-results has-slimscroll is-active">
                                <div v-for="user in filteredData" :key="user.id" class="search-result">
                                    <V-Avatar :picture="user.avatar" :initials="user.initials" :color="user.color" />
                                    <div class="meta">
                                        <span>{{ user.username }}</span>
                                        <span>{{ user.position }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Desktop navigation -->
            <template #links>
                <div class="buttons">
                    <RouterLink :to="{ name: 'index' }" class="button"> Inicio </RouterLink>
                    <RouterLink :to="{ name: 'blank' }" class="button"> Inicio </RouterLink>
                    <RouterLink :to="{ name: '' }" class="button"> Inicio </RouterLink>
                    <RouterLink
                        :to="{
                            name: 'dashboard-order-list',
                        }"
                        class="button"
                    >
                        Lista
                    </RouterLink>
                    <RouterLink :to="{}" class="button"> Detalhe </RouterLink>
                </div>
            </template>
        </NavbarSearch>

        <LanguagesPanel />
        <ActivityPanel />
        <TaskPanel />

        <div class="view-wrapper has-top-nav">
            <div class="page-content-wrapper">
                <template v-if="props.nowrap">
                    <slot></slot>
                </template>
                <div v-else class="page-content is-relative">
                    <div class="is-navbar-lg">
                        <div class="page-title has-text-centered">
                            <!-- Mobile Page Title -->
                            <div class="title-wrap">
                                <h1 class="title is-4">{{ pageTitle }}</h1>
                            </div>

                            <Toolbar class="mobile-toolbar">
                                <ToolbarNotification />

                                <a class="toolbar-link right-panel-trigger" @click="activePanel = 'activity'">
                                    <i aria-hidden="true" class="iconify" data-icon="feather:grid"></i>
                                </a>
                            </Toolbar>
                        </div>

                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navbar-layout-search {
    ::v-deep(.view-wrapper.has-top-nav) {
        min-height: 100vh;

        .is-stuck {
            top: 100px;
        }
    }
}
</style>
