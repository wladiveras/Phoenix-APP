<script setup lang="ts">
import { ref } from "vue"
import { completionOptions } from "/@src/data/dashboards/personal-v2/taskCompletionChart"
import { barOptions } from "/@src/data/dashboards/personal-v2/teamEfficiencyChart"
import { avatarStack1, avatarStack2, avatarStack3, avatarStack4 } from "/@src/data/dashboards/personal-v2/users"
import { popovers } from "/@src/data/users/userPopovers"

const democheck = ref(["value_2"])
</script>

<template>
    <div class="personal-dashboard personal-dashboard-v2">
        <!--Personal Dashboard V2-->
        <div class="columns is-multiline">
            <div class="column is-12">
                <div class="dashboard-header">
                    <V-Avatar picture="/demo/avatars/8.jpg" badge="/images/icons/flags/brazil.svg" size="xl" />
                    <div class="user-meta is-dark-bordered-12">
                        <h3 class="title is-4 is-narrow is-bold">Olá Wladi Veras,</h3>
                        <p class="light-text">É muito bom receber você novamente.</p>
                    </div>
                    <div class="user-action">
                        <h3 class="title is-2 is-narrow">3</h3>
                        <p class="light-text">Pedidos em andamento</p>
                        <a class="action-link">Ver Pedidos</a>
                    </div>
                    <div class="cta h-hidden-tablet-p">
                        <div class="media-flex inverted-text">
                            <i aria-hidden="true" class="lnil lnil-crown-alt-1"></i>
                            <p class="white-text">Não perca tempo,</p>
                        </div>
                        <a class="link inverted-text">Saiba mais</a>
                    </div>
                </div>
            </div>

            <div class="column is-8">
                <div class="dashboard-card has-margin-bottom">
                    <div class="card-head">
                        <h3 class="dark-inverted">Pedidos em andamento</h3>
                    </div>
                    <div class="active-projects">
                        <!--Project-->
                        <V-Block title="20 crachas 4/4" subtitle="Atualizado a 10 horas" center>
                            <template #icon>
                                <V-Avatar picture="/demo/photos/apps/4.png" size="medium" squared />
                            </template>
                            <VProgress size="tiny" color="danger" :value="38" />
                            <template #action>
                                <ProjectWidgetDropdown />
                            </template>
                        </V-Block>
                    </div>
                </div>
            </div>

            <div class="column is-4">
                <div class="dashboard-card">
                    <V-PlaceholderSection
                        title="Seja Premium"
                        subtitle="Acesso a fila de prioridade na fila de produção, Canal de suporte exclusivo."
                    >
                        <template #image>
                            <img
                                class="light-image"
                                src="/@src/assets/illustrations/placeholders/chart-guy.svg"
                                alt=""
                            />
                            <img
                                class="dark-image"
                                src="/@src/assets/illustrations/placeholders/chart-guy-dark.svg"
                                alt=""
                            />
                        </template>

                        <template #action>
                            <V-Button color="primary" elevated> Seja Premium </V-Button>
                        </template>
                    </V-PlaceholderSection>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../scss/abstracts/_variables.scss";
@import "../../../scss/abstracts/_mixins.scss";

.is-navbar {
    .personal-dashboard {
        margin-top: 30px;
    }
}

.personal-dashboard-v2 {
    .dashboard-header {
        @include vuero-s-card();

        display: flex;
        align-items: center;
        padding: 30px;

        .user-meta {
            padding: 0 3rem;
            border-right: 1px solid darken($fade-grey, 3%);

            h3 {
                max-width: 180px;
            }
        }

        .user-action {
            padding: 0 3rem;
        }

        .cta {
            position: relative;
            flex-grow: 2;
            max-width: 275px;
            margin-left: auto;
            background: lighten($primary, 8%);
            padding: 20px;
            border-radius: $radius-large;
            box-shadow: $primary-box-shadow;

            .lnil,
            .lnir {
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                font-size: 4rem;
                opacity: 0.3;
            }

            .link {
                font-family: $font-alt;
                display: block;
                font-weight: 500;
                margin-top: 0.5rem;

                &:hover {
                    color: $smoke-white;
                    opacity: 0.6;
                }
            }
        }
    }

    .dashboard-card {
        @include vuero-s-card();

        padding: 30px;

        &:not(:last-child) {
            margin-bottom: 1.5rem;
        }

        .card-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;

            h3 {
                font-family: $font-alt;
                font-size: 1rem;
                font-weight: 600;
                color: $dark-text;
                margin-bottom: 0;
            }
        }

        .active-projects,
        .active-team,
        .active-list {
            padding: 10px 0;
        }
    }
}

.is-dark {
    .personal-dashboard-v2 {
        .dashboard-header,
        .dashboard-card {
            @include vuero-card--dark();
        }

        .home-header {
            .cta {
                background: lighten($accent, 2%);
                box-shadow: $accent-box-shadow;
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .personal-dashboard-v2 {
        .dashboard-header {
            flex-direction: column;
            text-align: center;

            .v-avatar {
                margin-bottom: 10px;
            }

            .user-meta {
                padding-top: 10px;
                padding-bottom: 10px;
                border: none;
            }

            .user-action {
                padding-bottom: 30px;
            }

            .cta {
                margin-left: 0;
            }
        }

        .active-projects {
            .media-flex-center {
                .flex-end {
                    .avatar-stack {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>
