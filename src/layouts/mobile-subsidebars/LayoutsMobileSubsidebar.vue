<template>
    <div class="mobile-subsidebar">
        <div class="inner">
            <div class="sidebar-title">
                <h3>Layouts</h3>
            </div>

            <ul class="submenu">
                <li v-has-nested-router-link class="has-children">
                    <div class="collapse-wrap">
                        <a class="parent-link">
                            Lists
                            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
                        </a>
                    </div>
                    <ul>
                        <li>
                            <RouterLink :to="{ name: 'blank' }" class="is-submenu">
                                <i aria-hidden="true" class="lnil lnil-list-alt"></i>
                                <span>List View V1</span>
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
