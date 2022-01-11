<template>
    <div class="mobile-subsidebar">
        <div class="inner">
            <div class="sidebar-title">
                <h3>Dashboards</h3>
            </div>

            <ul class="submenu" data-simplebar>
                <li v-has-nested-router-link class="has-children">
                    <div class="collapse-wrap">
                        <a class="parent-link">
                            Personal
                            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
                        </a>
                    </div>
                    <ul>
                        <li>
                            <RouterLink :to="{ name: 'blank' }" class="is-submenu">
                                <i aria-hidden="true" class="lnil lnil-analytics-alt-1"></i>
                                <span>Personal V1</span>
                            </RouterLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../scss/abstracts/_variables.scss";
@import "../../scss/layout/_sidebar-mobile.scss";
</style>
