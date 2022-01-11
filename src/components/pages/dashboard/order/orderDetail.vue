<script setup lang="ts">
import type { PropType } from "vue"
import { ref } from "vue"
import { frontModel } from "/@src/data/alternativa/cards/models/front"
import { backModel } from "/@src/data/alternativa/cards/models/back"
import { cardsData } from "/@src/data/alternativa/cards/dataExample"

const props = defineProps({
    activeTab: {
        type: String as PropType<"order" | "cards" | "actions">,
        default: "order",
    },
    routeData: {
        type: Object,
        required: true,
    },
})

const filterTasks = ref(0)
const tab = ref(props.activeTab)
const rProps = ref(props.routeData)
</script>

<template>
    <div class="project-details">
        <div class="tabs-wrapper is-triple-slider">
            <div class="tabs-inner">
                <div class="tabs">
                    <ul>
                        <li :class="[tab === 'order' ? 'is-active' : null]">
                            <a @click="tab = 'order'"> <span>Pedido</span> </a>
                        </li>
                        <li :class="[tab === 'cards' ? 'is-active' : null]">
                            <a @click="tab = 'cards'"> <span>Cartões</span> </a>
                        </li>
                        <li :class="[tab === 'actions' ? 'is-active' : null]">
                            <a @click="tab = 'actions'"> <span>Ações</span> </a>
                        </li>
                        <li class="tab-naver"></li>
                    </ul>
                </div>
            </div>

            <div id="project-tab" class="tab-content" :class="[tab === 'order' ? 'is-active' : null]">
                <div class="columns project-details-inner">
                    <div class="column is-8">
                        <div class="project-details-card">
                            <div class="card-head">
                                <div class="title-wrap">
                                    <h3>Pedido #{{ rProps.id }}</h3>
                                    <p>XING LING LTDA.</p>
                                </div>

                                <V-IconButton size="small" icon="feather:edit-3" />
                            </div>

                            <div class="project-overview">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc id dui
                                    tinciduntLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc id
                                    dui tinciduntLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nunc
                                    id dui tincidunt
                                </p>
                            </div>

                            <div class="project-files">
                                <h4>Arquivos Utilitarios</h4>
                                <div class="columns is-multiline">
                                    <div class="column is-6">
                                        <div class="file-box">
                                            <img src="/images/icons/files/zip-format.svg" alt="" />
                                            <div class="meta">
                                                <span>Fotos</span>
                                                <span>
                                                    <i aria-hidden="true" class="fas fa-circle"></i>
                                                    Fotos dos Cartões
                                                </span>
                                            </div>
                                            <FileCardDropdown />
                                        </div>
                                    </div>

                                    <div class="column is-6">
                                        <div class="file-box">
                                            <img src="/images/icons/files/sheet.svg" alt="" />
                                            <div class="meta">
                                                <span>Dados</span>
                                                <span>
                                                    <i aria-hidden="true" class="fas fa-circle"></i>
                                                    Planilha de informações
                                                </span>
                                            </div>
                                            <FileCardDropdown />
                                        </div>
                                    </div>
                                    <div class="column is-6">
                                        <div class="file-box">
                                            <img src="/images/icons/files/doc.svg" alt="" />
                                            <div class="meta">
                                                <span>Project Notes</span>
                                                <span>
                                                    <i aria-hidden="true" class="fas fa-circle"></i>
                                                    Diversos
                                                </span>
                                            </div>
                                            <FileCardDropdown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="column is-4">
                        <div class="side-card">
                            <AltCard
                                caption="Alternativa"
                                :front-data="cardsData[0].front"
                                :back-data="cardsData[0].back"
                                :front-model="frontModel"
                                :back-model="backModel"
                            >
                            </AltCard>
                        </div>

                        <div class="side-card">
                            <h4>Informações do Cliente</h4>

                            <V-Block center title="XING LING LTDA" subtitle="cane@quejo.flango">
                                <template #icon>
                                    <V-Avatar
                                        size="small"
                                        picture="/@src/assets/illustrations/dashboards/flights/company1.svg"
                                    />
                                </template>
                            </V-Block>
                        </div>
                    </div>
                </div>
            </div>

            <!--Project Team-->
            <div id="team-tab" class="tab-content" :class="[tab === 'cards' ? 'is-active' : null]">
                <div class="project-details-inner">
                    <OrderCards :cards-data="cardsData" :front-model="frontModel" :back-model="backModel" />
                </div>
            </div>

            <div id="tasks-tab" class="tab-content" :class="[tab === 'actions' ? 'is-active' : null]">
                <div class="project-details-inner">
                    <OrderActions />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../../scss/abstracts/_variables.scss";
@import "../../../../scss/abstracts/_mixins.scss";
@import "../../../../scss/abstracts/_mixins.scss";
/* ==========================================================================
1. Project Details
========================================================================== */

.small {
    width: 168px;
    height: 255px;
    transform: scale(0.7);
}

.is-navbar {
    .project-details {
        padding-top: 30px;
    }
}

.project-details {
    .tabs-wrapper {
        .tabs-inner {
            .tabs {
                margin: 0 auto;
                background: $white;
            }
        }
    }

    .project-details-inner {
        padding: 20px 0;

        .project-details-card {
            @include vuero-s-card();

            padding: 40px;

            .card-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;

                .title-wrap {
                    h3 {
                        font-family: $font-alt;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: $dark-text;
                        line-height: 1.2;
                        transition: all 0.3s;
                    }
                }
            }

            .project-overview {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px 0;

                p {
                    max-width: 420px;
                }
            }

            .project-features {
                display: flex;
                padding: 25px 0;
                border-top: 1px solid darken($fade-grey, 3%);
                border-bottom: 1px solid darken($fade-grey, 3%);

                .project-feature {
                    margin-right: 20px;
                    width: calc(25% - 20px);

                    i {
                        font-size: 1.6rem;
                        color: $primary;
                        margin-bottom: 8px;
                    }

                    h4 {
                        font-family: $font-alt;
                        font-size: 0.85rem;
                        font-weight: 600;
                        color: $dark;
                    }

                    p {
                        line-height: 1.2;
                        font-size: 0.85rem;
                        color: $light-text;
                        margin-bottom: 0;
                    }
                }
            }

            .project-files {
                padding: 20px 0;

                h4 {
                    font-family: $font-alt;
                    font-weight: 600;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: $primary;
                    margin-bottom: 12px;
                }

                .file-box {
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    background: $white;
                    border: 1px solid transparent;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s;

                    &:hover {
                        border-color: darken($fade-grey, 3%);
                        box-shadow: $light-box-shadow;
                    }

                    img {
                        display: block;
                        width: 48px;
                        min-width: 48px;
                        height: 48px;
                    }

                    .meta {
                        margin-left: 12px;
                        line-height: 1.3;

                        span {
                            display: block;

                            &:first-child {
                                font-family: $font-alt;
                                font-size: 0.9rem;
                                font-weight: 600;
                                color: $dark-text;
                            }

                            &:nth-child(2) {
                                font-size: 0.9rem;
                                color: $light-text;

                                i {
                                    position: relative;
                                    top: -3px;
                                    font-size: 0.3rem;
                                    color: $light-text;
                                    margin: 0 4px;
                                }
                            }
                        }
                    }

                    .dropdown {
                        margin-left: auto;
                    }
                }
            }
        }

        .side-card {
            @include vuero-s-card();

            padding: 40px;
            margin-bottom: 1.5rem;

            h4 {
                font-family: $font-alt;
                font-weight: 600;
                font-size: 0.8rem;
                text-transform: uppercase;
                color: $primary;
                margin-bottom: 16px;
            }
        }

        .project-team-card {
            @include vuero-s-card();

            padding: 40px;
            max-width: 940px;
            display: block;
            margin: 0 auto;

            .column {
                padding: 1.5rem;

                &:nth-child(odd) {
                    border-right: 1px solid darken($fade-grey, 3%);
                }

                &.has-border-bottom {
                    border-bottom: 1px solid darken($fade-grey, 3%);
                }
            }
        }

        .task-grid {
            .grid-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;

                h3 {
                    font-family: $font-alt;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: $dark-text;
                    line-height: 1.2;
                }

                .filter {
                    display: flex;
                    align-items: center;
                    background: $white;
                    padding: 8px 24px;
                    border-radius: 100px;

                    > span {
                        font-family: $font-alt;
                        font-size: 0.85rem;
                        font-weight: 600;
                        color: $dark-text;
                        margin-right: 20px;
                    }

                    .multiselect {
                        min-width: 140px;

                        .multiselect-input {
                            border: none;
                        }
                    }
                }
            }

            .task-card {
                @include vuero-s-card();

                min-height: 200px;
                display: flex !important;
                flex-direction: column;
                justify-content: space-between;
                padding: 30px;
                cursor: pointer;
                transition: all 0.3s;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: $light-box-shadow;
                }

                .title-wrap {
                    h3 {
                        font-size: 1.1rem;
                        font-family: $font-alt;
                        font-weight: 600;
                        color: $dark-text;
                        line-height: 1.2;
                        margin-bottom: 4px;
                    }

                    span {
                        font-family: $font;
                        font-size: 0.9rem;
                        color: $light-text;
                    }
                }

                .content-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .left {
                        .avatar-stack {
                            margin-bottom: 6px;
                        }

                        .attachments {
                            display: flex;
                            align-items: center;

                            i {
                                font-size: 15px;
                                color: $light-text;
                            }

                            span {
                                margin-left: 2px;
                                font-size: 0.9rem;
                                font-family: $font;
                                color: $light-text;
                            }
                        }
                    }
                }
            }
        }
    }
}

/* ==========================================================================
2. Project Details Dark Mode
========================================================================== */

.is-dark {
    .project-details {
        .project-details-inner {
            .project-details-card {
                @include vuero-card--dark();

                .card-head {
                    .title-wrap {
                        h3 {
                            color: $dark-dark-text !important;
                        }
                    }
                }

                .project-features {
                    border-color: lighten($dark-sidebar, 12%);

                    .project-feature {
                        i {
                            color: $accent;
                        }

                        h4 {
                            color: $dark-dark-text;
                        }
                    }
                }

                .project-files {
                    h4 {
                        color: $accent;
                    }

                    .file-box {
                        background: lighten($dark-sidebar, 3%);

                        &:hover {
                            border-color: lighten($dark-sidebar, 10%);
                        }

                        .meta {
                            span {
                                &:first-child {
                                    color: $dark-dark-text;
                                }
                            }
                        }
                    }
                }
            }

            .side-card {
                @include vuero-card--dark();

                h4 {
                    color: $accent;
                }
            }

            .project-team-card {
                @include vuero-card--dark();

                .column {
                    border-color: lighten($dark-sidebar, 12%);
                }
            }

            .task-grid {
                .grid-header {
                    h3 {
                        color: $dark-dark-text;
                    }

                    .filter {
                        background: lighten($dark-sidebar, 1%) !important;
                        border-color: lighten($dark-sidebar, 4%) !important;

                        > span {
                            color: $dark-dark-text;
                        }
                    }
                }

                .task-card {
                    @include vuero-card--dark();

                    .title-wrap {
                        h3 {
                            color: $dark-dark-text;
                        }
                    }
                }
            }
        }
    }
}

/* ==========================================================================
3. Media Queries
========================================================================== */

@media only screen and (max-width: 767px) {
    .project-details {
        .project-details-inner {
            .project-details-card {
                padding: 30px;

                .project-overview {
                    flex-direction: column;

                    p {
                        margin-bottom: 20px;
                    }
                }

                .project-features {
                    flex-wrap: wrap;

                    .project-feature {
                        width: calc(50% - 20px);
                        text-align: center;
                        margin: 0 10px;

                        &:first-child,
                        &:nth-child(2) {
                            margin-bottom: 20px;
                        }
                    }
                }
            }

            .project-team-card {
                padding: 30px;

                .column {
                    border-right: none !important;
                }
            }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .project-details {
        .project-details-inner {
            .project-details-card {
                .project-files {
                    .columns {
                        display: flex;

                        .column {
                            min-width: 50%;
                        }
                    }
                }
            }

            .project-team-card {
                .columns {
                    display: flex;

                    .column {
                        min-width: 50%;
                    }
                }
            }

            .task-grid {
                .columns {
                    display: flex;

                    .column {
                        min-width: 50%;
                    }
                }
            }
        }
    }
}
</style>
