<script setup lang="ts">
import { todoList3, todoList4 } from "/@src/data/widgets/list/todoList"
import { users } from "/@src/data/layouts/user-grid-v2"
import { ref } from "vue"

const links = [
    {
        picture: "/demo/avatars/9.jpg",
        title: "Alternativa Messenger",
        description: "Serviço de Atendimento online ao Cliente",
        url: "https://messages.alternativacard.com",
    },
    {
        picture: "/demo/avatars/9.jpg",
        title: "Email",
        description: "Serviço de Email da Alternativa",
        url: "https://alternativafc.com.br/email",
    },
    {
        picture: "/demo/avatars/9.jpg",
        title: "Calculadora",
        description: "Serviço de calculo de impostos e valores do produto.",
        url: "https://calculator.wladiveras.com",
    },
]

const invoices = [
    {
        id: 5994,
        status: "Approved",
        user: {
            name: "Wladi Veras",
            avatar: "/demo/avatars/1.jpg",
        },
    },
    {
        id: 7696,
        status: "Canceled",
        user: {
            name: "Wladi Veras",
            avatar: "/demo/avatars/1.jpg",
        },
    },
    {
        id: 3243,
        status: "Pending",
        user: {
            name: "Wladi Veras",
            avatar: "/demo/avatars/1.jpg",
        },
    },
]
</script>

<template>
    <div class="business-dashboard hr-dashboard">
        <div class="columns">
            <div class="column is-8">
                <div class="columns is-multiline">
                    <!--Header-->
                    <div class="column is-12">
                        <div class="block-header">
                            <!--left-->
                            <div class="left">
                                <div class="current-user">
                                    <V-Avatar size="medium" picture="/demo/avatars/8.jpg" rounded />
                                    <h3>Olá, Murilo Couto.</h3>
                                </div>
                            </div>

                            <!--Center-->
                            <div class="center">
                                <h4 class="block-heading">Link Uteis</h4>
                                <p class="block-text">Coleção de Links uteis para auxiliar no dia a dia</p>
                                <div class="candidates">
                                    <tippy v-for="(V, K) in links" :key="K">
                                        <a target="_BLANK" :href="V.url">
                                            <V-Avatar style="margin: 3px" :picture="V.picture" rounded />
                                        </a>
                                        <template #content>
                                            <div class="v-popover-content is-text">
                                                <div class="popover-head">
                                                    <V-IconBox size="small" color="yellow">
                                                        <i aria-hidden="true" class="fas fa-star"></i>
                                                    </V-IconBox>
                                                    <h4 class="dark-inverted">{{ V.title }}</h4>
                                                </div>
                                                <div class="popover-body">
                                                    <p>{{ V.description }}</p>
                                                </div>
                                            </div>
                                        </template>
                                    </tippy>
                                </div>
                            </div>

                            <!--Right-->
                            <div class="right">
                                <h4 class="block-heading">Proposta Comercial</h4>
                                <p class="block-text">Encaminhar proposta comercial para a Produção</p>
                                <RouterLink
                                    :to="{
                                        name: 'commercial-new',
                                    }"
                                >
                                    <V-Button color="primary" bold fullwidth outlined> Registrar Proposta </V-Button>
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                    <!--Rookies-->
                    <div class="column is-12">
                        <div class="recent-rookies">
                            <div class="recent-rookies-header">
                                <h3 class="dark-inverted">Propostas Recente</h3>
                            </div>

                            <transition-group name="list" tag="div" class="columns is-multiline">
                                <!--Grid item-->
                                <div v-for="(V, K) in invoices" :key="K" class="column is-4">
                                    <div class="grid-item-wrap">
                                        <div class="grid-item-head">
                                            <div class="flex-head">
                                                <div class="meta">
                                                    <span v-if="V.status === 'Approved'" class="dark-inverted">
                                                        Pagamento Aprovado
                                                    </span>
                                                    <span v-if="V.status === 'Canceled'" class="dark-inverted">
                                                        Proposta Cancelada
                                                    </span>
                                                    <span v-if="V.status === 'Pending'" class="dark-inverted">
                                                        Pagamento Pendente
                                                    </span>
                                                    <span>Proposta #{{ V.id }}</span>
                                                </div>
                                                <div v-if="V.status === 'Approved'" class="status-icon is-success">
                                                    <i aria-hidden="true" class="fas fa-check"></i>
                                                </div>
                                                <div v-if="V.status === 'Canceled'" class="status-icon is-danger">
                                                    <i aria-hidden="true" class="fas fa-times"></i>
                                                </div>
                                                <div v-if="V.status === 'Pending'" class="status-icon is-warning">
                                                    <i aria-hidden="true" class="fas fa-exclamation"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="grid-item">
                                            <V-Avatar :picture="V.user.avatar" size="big" />
                                            <h3 class="dark-inverted">{{ V.user.name }}</h3>
                                        </div>
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column is-4">
                <!--Widget-->
                <UIWidget class="search-widget">
                    <template #body>
                        <div class="field">
                            <div class="control">
                                <input type="text" class="input" placeholder="Buscar pedido..." />
                                <button class="searcv-button">
                                    <i aria-hidden="true" class="iconify" data-icon="feather:search"></i>
                                </button>
                            </div>
                        </div>
                    </template>
                </UIWidget>

                <!--Widget-->
                <ListWidgetTabbed title="Todo" :labels="['All', 'Mine']" class="list-widget-v2">
                    <template #tab1>
                        <ListWidgetTodoList :todos="todoList3" />
                    </template>
                    <template #tab2>
                        <ListWidgetTodoList :todos="todoList4" />
                    </template>
                </ListWidgetTabbed>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../scss/abstracts/_variables.scss";
@import "../../../scss/abstracts/_mixins.scss";
@import "../../../scss/pages/generic/_widgets-lists.scss";

.hr-dashboard {
    .block-header {
        display: flex;
        border-radius: 16px;
        padding: 50px;
        background: $white;
        font-family: $font;

        .left,
        .right {
            width: 30%;
        }

        .center {
            display: flex;
            flex-direction: column;
            width: 40%;
            padding-right: 30px;
            margin-right: 30px;
            border-right: 1px solid lighten($dark-dark-text, 10%);

            .block-text {
                margin-bottom: 16px;
            }

            .candidates {
                margin-top: auto;

                > .v-avatar {
                    margin-right: 10px;
                }

                button {
                    height: 40px;
                    width: 40px;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 10px;
                    background: $white;
                    color: $light-text;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    transition: all 0.3s;

                    svg {
                        height: 18px;
                        width: 18px;
                    }
                }
            }
        }

        .left {
            display: flex;
            justify-content: center;
            align-items: center;

            .current-user {
                .v-avatar {
                    margin-bottom: 1rem;
                }

                h3 {
                    font-family: $font-alt;
                    font-weight: 700;
                    font-size: 1.8rem;
                    line-height: 1.2;
                }
            }
        }

        .right {
            display: flex;
            flex-direction: column;

            .button {
                margin-top: auto;
            }
        }

        .block-heading {
            font-family: $font-alt;
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 4px;
        }

        .block-text {
            font-family: $font;
            font-size: 0.9rem;
            margin-bottom: 16px;
        }

        .header-meta {
            margin-left: 0;
            padding-right: 30px;

            h3 {
                font-family: $font-alt;
                font-weight: 700;
                font-size: 1.3rem;
                max-width: 280px;
            }

            p {
                font-weight: 400;
                color: darken($smoke-white, 2%);
                margin-bottom: 16px;
                max-width: 320px;
            }

            .action-link {
                span {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    margin-right: 6px;
                }

                i {
                    font-size: 12px;
                }
            }
        }
    }

    .feed-settings {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;

        h3 {
            font-family: $font-alt;
            font-size: 1.1rem;
            font-weight: 600;
            color: $dark-text;
        }

        .button {
            font-size: 0.8rem;
            border-radius: 8px;
            margin-right: 4px;

            &.is-selected {
                background: $primary;
                color: $white;
                border-color: $primary;
                box-shadow: $primary-box-shadow;
            }
        }
    }

    .side-text {
        h3 {
            font-family: $font-alt;
            font-size: 1.1rem;
            font-weight: 600;
            color: $dark-text;
            margin-bottom: 8px;
        }

        p {
            font-size: 0.95rem;
            margin-bottom: 8px;
        }

        .action-link {
            font-size: 0.9rem;
        }
    }

    .recent-rookies {
        .recent-rookies-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;

            h3 {
                font-family: $font-alt;
                font-size: 1.1rem;
                font-weight: 600;
                color: $dark-text;
            }
        }

        .user-grid {
            &.user-grid-v4 {
                .grid-item {
                    @include vuero-l-card();
                }
            }
        }
    }
}

.user-grid {
    .columns {
        margin-left: -0.5rem !important;
        margin-right: -0.5rem !important;
        margin-top: -0.5rem !important;
    }

    .column {
        padding: 0.5rem !important;
    }

    .grid-item {
        position: relative;
        @include vuero-s-card();
        text-align: center;

        &:hover {
            .button-wrap {
                > div {
                    a {
                        opacity: 1;
                        pointer-events: all;
                    }
                }
            }
        }

        .dropdown {
            position: absolute;
            top: 10px;
            right: 10px;
            text-align: left;
        }

        > .v-avatar {
            display: block;
            margin: 0 auto 4px auto;
        }

        h3 {
            font-family: $font-alt;
            font-size: 1.1rem;
            font-weight: 600;
            color: $dark-text;
        }

        p {
            font-size: 0.85rem;
        }

        .button-wrap {
            margin: 20px 0 0 0;

            .v-button {
                width: 100%;
                max-width: 140px;
                margin: 0 auto;
            }

            > div {
                margin: 6px 0 0 0;

                a {
                    opacity: 0;
                    pointer-events: none;
                    color: $light-text;
                    font-weight: 500;
                    font-size: 0.9rem;
                    transition: opacity 0.3s, color 0.3s;

                    &:hover {
                        color: $primary;
                    }
                }
            }
        }
    }
}

.is-dark {
    .user-grid {
        .grid-item {
            @include vuero-card--dark();
        }
    }

    .hr-dashboard {
        .block-header {
            background: $dark-sidebar;
            box-shadow: none;

            .center {
                border-color: lighten($dark-sidebar, 10%);

                .candidates {
                    button {
                        background: lighten($dark-sidebar, 10%);
                        border: 1px solid transparent;
                        transition: all 0.3s;

                        &:hover {
                            border-color: $accent;

                            svg {
                                color: $accent;
                            }
                        }
                    }
                }
            }
        }

        .feed-settings {
            .button {
                &.is-selected {
                    background: $accent !important;
                    border-color: $accent !important;
                    box-shadow: $accent-box-shadow !important;
                    color: $white !important;
                }
            }
        }

        .recent-rookies {
            .user-grid {
                &.user-grid-v4 {
                    .grid-item {
                        @include vuero-card--dark();
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .hr-dashboard {
        .block-header {
            flex-direction: column;
            padding: 30px;

            .left,
            .center,
            .right {
                width: 100%;
            }

            .left {
                justify-content: flex-start;
                margin-bottom: 20px;
            }

            .center {
                padding-right: 0;
                margin-right: 0;
                border-right: none;
                margin-bottom: 20px;
            }
        }

        .feed-settings {
            flex-direction: column;

            h3 {
                margin-bottom: 16px;
            }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .hr-dashboard {
        .block-header {
            padding: 40px;
        }

        .side-text {
            display: none;
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .hr-dashboard {
        .block-header {
            padding: 40px;

            .left {
                .current-user {
                    h3 {
                        font-size: 1.5rem;
                    }
                }
            }

            .center {
                .candidates {
                    .v-avatar {
                        &:nth-child(3) {
                            display: none;
                        }
                    }
                }
            }
        }

        .column {
            &.is-7 {
                &.is-offset-1 {
                    margin-left: 2% !important;
                    width: 64.33333% !important;
                }
            }
        }
    }
}

.hr-dashboard {
    .columns {
        margin-left: -0.5rem !important;
        margin-right: -0.5rem !important;
        margin-top: -0.5rem !important;
    }

    .column {
        padding: 0.5rem !important;
    }

    .grid-item {
        @include vuero-s-card();

        text-align: center;

        > .v-avatar {
            display: block;
            margin: 0 auto 4px auto;
        }

        h3 {
            font-family: $font-alt;
            font-size: 1.1rem;
            font-weight: 600;
            color: $dark-text;
        }

        p {
            font-size: 0.85rem;
        }

        .people {
            display: flex;
            justify-content: center;
            padding: 8px 0 30px 0;

            .v-avatar {
                margin: 0 4px;
            }
        }

        .buttons {
            display: flex;
            justify-content: space-between;

            .button {
                width: calc(50% - 4px);
                color: $light-text;

                &:hover {
                    border-color: darken($fade-grey, 4%);
                    color: $primary;
                    box-shadow: $light-box-shadow;
                }
            }
        }
    }

    .grid-item-wrap {
        border: 1px solid darken($fade-grey, 3%);
        border-radius: $radius-large;
        transition: all 0.3s;

        .grid-item-head {
            background: #fafafa;
            border-radius: $radius-large 6px 0 0;
            padding: 20px;

            .flex-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;

                .meta {
                    span {
                        display: flex;

                        &:first-child {
                            font-family: $font-alt;
                            font-weight: 600;
                            font-size: 0.95rem;
                            color: $dark-text;
                        }

                        &:nth-child(2) {
                            font-size: 0.9rem;
                            color: $light-text;
                        }
                    }
                }

                .status-icon {
                    height: 28px;
                    width: 28px;
                    min-width: 28px;
                    border-radius: $radius-rounded;
                    border: 1px solid darken($fade-grey, 3%);
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &.is-success {
                        background: $success;
                        border-color: $success;
                        color: $white;
                    }

                    &.is-warning {
                        background: $h-orange;
                        border-color: $h-orange;
                        color: $white;
                    }

                    &.is-danger {
                        background: $danger;
                        border-color: $danger;
                        color: $white;
                    }

                    i {
                        font-size: 8px;
                    }
                }
            }

            .buttons {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0;

                .button,
                .v-button {
                    width: calc(50% - 4px);
                    color: $light-text;
                    margin-bottom: 0;

                    &:hover {
                        border-color: darken($fade-grey, 4%);
                        color: $primary;
                        box-shadow: $light-box-shadow;
                    }
                }
            }
        }

        .grid-item {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border: none;
        }
    }
}

.is-dark {
    .grid-item {
        @include vuero-s-card();
        @include vuero-card--dark();
    }
    .user-grid {
        .grid-item {
            @include vuero-card--dark();
        }
    }
    .hr-dashboard {
        .grid-item-wrap {
            border-color: lighten($dark-sidebar, 12%);

            .grid-item-head {
                background: lighten($dark-sidebar, 4%);
            }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .hr-dashboard {
        .columns {
            display: flex;

            .column {
                min-width: 50% !important;
            }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .hr-dashboard {
        .columns {
            .column {
                min-width: 33.3% !important;
            }
        }
    }
}
</style>
