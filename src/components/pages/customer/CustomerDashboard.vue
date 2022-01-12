<script setup lang="ts">
import { ref } from "vue"

import { followersStats } from "/@src/data/widgets/ui/followers"
import { iconList } from "/@src/data/widgets/ui/menuList"

import { frontModel } from "/@src/data/alternativa/cards/models/front"
import { backModel } from "/@src/data/alternativa/cards/models/back"
import { cardsData } from "/@src/data/alternativa/cards/dataExample"

const activeSection = ref("cart")

const userModels = ref({
    current: 345,
    models: [5675, 3249, 2879, 3454],
})

const ordersData = ref([
    {
        id: 5349,
        status: 0,
        cards: {
            total: 30,
            current: 0,
        },
    },
    {
        id: 56756,
        status: 1,
        cards: {
            total: 30,
            current: 0,
        },
    },
    {
        id: 2342,
        status: 2,
        cards: {
            total: 30,
            current: 0,
        },
    },
    {
        id: 8753,
        status: 4,
        cards: {
            total: 30,
            current: 0,
        },
    },
    {
        id: 54645,
        status: 3,
        cards: {
            total: 30,
            current: 0,
        },
    },
    {
        id: 54645,
        status: 5,
        cards: {
            total: 30,
            current: 0,
        },
        report: "Fila de produção pausada por: falta de material",
    },
])

const setCurrent = V => {
    userModels.value.current = V
}
</script>

<template>
    <div class="food-delivery-dashboard">
        <!--Left-->
        <div class="left">
            <div class="left-header">
                <div class="header-image">
                    <img src="/@src/assets/illustrations/dashboards/food/header.svg" alt="" />
                </div>
                <div class="header-meta">
                    <h3>Olá, Wladi Veras 🎉</h3>
                    <p>Seu pedido #5349 está aguardando aprovação</p>
                    <a class="action-link">
                        <span>Solicitar novo modelo de cartão</span>
                        <i aria-hidden="true" class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <div class="left-body">
                <div class="restaurants">
                    <div class="restaurants-list">
                        <!--Restaurants Loop-->
                        <div class="flex-table-wrapper mt-12">
                            <!--Custom table toolbar-->
                            <div class="flex-table-toolbar">
                                <div class="left">
                                    <VField>
                                        <VControl icon="feather:search">
                                            <input
                                                type="text"
                                                class="input is-rounded"
                                                placeholder="Pesquisar pedido..."
                                            />
                                        </VControl>
                                    </VField>
                                </div>

                                <div class="right">
                                    <VField>
                                        <VControl>
                                            <div class="select is-rounded">
                                                <select>
                                                    <option selected>10 resultados</option>
                                                    <option>25 resultados</option>
                                                    <option>50 resultados</option>
                                                    <option>100 resultados</option>
                                                </select>
                                            </div>
                                        </VControl>
                                    </VField>
                                </div>
                            </div>

                            <!--VFlexTable-->
                            <VFlexTable>
                                <template #header>
                                    <div class="flex-table-header">
                                        <span class="cell-start">Pedido</span>
                                        <span></span>
                                        <span>Progresso</span>
                                        <span>status</span>
                                        <span class="cell-end">Ações</span>
                                    </div>
                                </template>
                                <template #body>
                                    <CustomerOrderTable :rows="ordersData" />
                                </template>
                            </VFlexTable>

                            <!--Table Pagination-->
                            <VFlexPagination
                                :item-per-page="10"
                                :total-items="873"
                                :current-page="42"
                                :max-links-displayed="5"
                            />
                        </div>
                        <!--Restaurants Loop-->
                    </div>
                </div>
            </div>
        </div>

        <div class="right fixed-parent">
            <div class="sticky-panel fixed-child">
                <div class="widget icon-toolbar-widget">
                    <div class="icon-toolbar">
                        <div class="toolbar-icon">
                            <a
                                class="inner-icon"
                                :class="[activeSection === 'cart' && 'is-active']"
                                @click="activeSection = 'cart'"
                            >
                                <i aria-hidden="true" class="iconify" data-icon="feather:shopping-cart"></i>
                            </a>
                        </div>
                        <div class="toolbar-icon">
                            <a
                                class="inner-icon"
                                :class="[activeSection === 'activity' && 'is-active']"
                                @click="activeSection = 'activity'"
                            >
                                <i aria-hidden="true" class="iconify" data-icon="feather:activity"></i>
                            </a>
                        </div>
                        <div class="toolbar-icon">
                            <a
                                class="inner-icon"
                                :class="[activeSection === 'address' && 'is-active']"
                                @click="activeSection = 'address'"
                            >
                                <i aria-hidden="true" class="iconify" data-icon="feather:map-pin"></i>
                            </a>
                        </div>
                        <div class="toolbar-icon">
                            <a
                                class="inner-icon"
                                :class="[activeSection === 'settings' && 'is-active']"
                                @click="activeSection = 'settings'"
                            >
                                <i aria-hidden="true" class="iconify" data-icon="feather:settings"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="cart-widget side-section" :class="[activeSection === 'cart' && 'is-active']">
                    <div class="widget-toolbar">
                        <div class="left">
                            <h3 class="is-bigger">Meus Modelos</h3>
                        </div>
                        <div class="right">
                            <span class="tag is-curved">5 modelos</span>
                        </div>
                    </div>

                    <div v-if="1 === 1">
                        <AltCard
                            caption="Alternativa"
                            :front-data="cardsData[0].front"
                            :back-data="cardsData[0].back"
                            :front-model="frontModel"
                            :back-model="backModel"
                        >
                        </AltCard>
                        <div class="cart-button">
                            <div class="total">
                                <VDropdown title="Selecionar modelo ">
                                    <template #content>
                                        <a
                                            class="dropdown-item is-media"
                                            @click="setCurrent(V)"
                                            :key="K"
                                            v-for="(V, K) in userModels.models"
                                        >
                                            <div class="icon">
                                                <i class="lnil lnil-coins"></i>
                                            </div>
                                            <div class="meta">
                                                <span>Modelo</span>
                                                <span>#{{ V }}</span>
                                            </div>
                                        </a>
                                    </template>
                                </VDropdown>
                                <span>#{{ userModels.current }}</span>
                            </div>
                            <V-Button color="primary" raised bold fullwidth> Abrir pedido </V-Button>
                        </div>
                    </div>
                    <div v-else>
                        <V-PlaceholderSection
                            title="Nenhum Modelo"
                            subtitle="Oops, parece que você não tem nenhum modelo ainda, mas não se preocupe. faça um novo pedido para solicitar um."
                        >
                            <template #image>
                                <img
                                    class="light-image"
                                    src="/@src/assets/illustrations/dashboards/food/cart-placeholder.svg"
                                    alt=""
                                />
                                <img
                                    class="dark-image"
                                    src="/@src/assets/illustrations/dashboards/food/cart-placeholder.svg"
                                    alt=""
                                />
                            </template>
                        </V-PlaceholderSection>

                        <div class="cart-button">
                            <V-Button color="primary" raised bold fullwidth> Solicitar primeiro modelo </V-Button>
                        </div>
                    </div>
                </div>

                <div class="side-section" :class="[activeSection === 'activity' && 'is-active']">
                    <UIWidget class="followers-widget">
                        <template #header>
                            <UIWidgetToolbarDropdown title="Followers" />
                        </template>
                        <template #body>
                            <UIWidgetFollowerStats :channels="followersStats" />
                        </template>
                    </UIWidget>

                    <IllustrationWidget
                        class="illustration-widget-v2"
                        title="You unlocked 2 new Achievements"
                        text="Congrats, your efforts have been rewarded. Keep up like this!"
                        picture="/@src/assets/illustrations/dashboards/food/widget.svg"
                    />
                </div>

                <div class="side-section" :class="[activeSection === 'address' && 'is-active']">
                    <UIWidget class="text-widget">
                        <template #header>
                            <UIWidgetToolbarIcon title="Deliver to" icon="feather:map-pin" />
                        </template>
                        <template #body>
                            <div class="widget-content">
                                <p>Erik Kovalsky</p>
                                <p>38, Suite B2 Parkman Avenue</p>
                                <p>Los Angeles, CA</p>
                            </div>
                        </template>
                    </UIWidget>

                    <ContactWidget
                        picture="/demo/avatars/8.jpg"
                        username="Erik K."
                        email="erikkovalsky@vuero.io"
                        company="Vuero Ltd."
                        position="Product Manager"
                        location="Los Angeles, CA"
                        phone="+1 444-5156"
                        squared
                        reversed
                    />
                </div>

                <div class="side-section" :class="[activeSection === 'settings' && 'is-active']">
                    <UIWidget class="icon-list-widget">
                        <template #body>
                            <UIWidgetIconList :list="iconList" />
                        </template>
                    </UIWidget>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../scss/abstracts/_variables.scss";
@import "../../../scss/abstracts/_mixins.scss";
@import "../../../scss/pages/generic/_widgets-lists.scss";

.food-delivery-dashboard {
    display: flex;

    &.is-navbar {
        margin-top: 30px;

        > .right {
            .sticky-panel {
                height: calc(100% - 120px) !important;

                &.is-stretched {
                    height: calc(100% - 120px);
                    top: 100px;
                }
            }
        }
    }

    .left {
        width: 70%;

        .left-header {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 16px;
            background: lighten($accent, 32%);
            font-family: $font;

            .header-image {
                position: relative;
                height: 150px;
                width: 280px;

                img {
                    position: absolute;
                    top: -40px;
                    left: -30px;
                    display: block;
                }
            }

            .header-meta {
                margin-left: 0;
                margin-bottom: 20px;

                h3 {
                    font-family: $font-alt;
                    font-weight: 700;
                    font-size: 1.6rem;
                }

                p {
                    font-weight: 400;
                    color: darken($primary, 14%);
                    margin-bottom: 8px;
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

        .left-body {
            .restaurants {
                .restaurants-toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 20px 0;
                    font-family: $font;

                    .left {
                        h3 {
                            font-family: $font-alt;
                            color: $dark-text;
                            font-size: 1.3rem;
                            font-weight: 600;
                        }
                    }

                    .right {
                        display: flex;
                        justify-content: flex-end;
                    }
                }
            }

            .food-pills {
                position: relative;

                .food-pills-inner {
                    .food-pill {
                        outline: none;
                        width: 180px !important;
                        max-width: 300px !important;
                        height: 313px;
                        padding: 0px;
                        margin: 0 10px;
                        cursor: pointer;
                        background: none;
                        transition: all 0.3s;
                    }
                }

                .tns-slider {
                    &:focus {
                        outline: none !important;
                    }

                    .active {
                        background: $primary;
                        border-color: $primary;

                        .food-pill-icon {
                            border-color: $primary;
                        }

                        > span {
                            color: $smoke-white;
                        }
                    }
                }

                .slick-prev::before,
                .slick-next::before {
                    color: $muted-grey;
                }

                .slick-custom {
                    position: absolute;
                    top: -50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid transparent;
                    width: 30px;
                    height: 30px;
                    background: transparent;
                    border-radius: 100px;
                    cursor: pointer;
                    color: $light-text;
                    transition: all 0.3s;
                    z-index: 25;
                    outline: none !important;

                    &.is-prev {
                        right: 30px;

                        i {
                            position: relative;
                            left: -1px;
                        }
                    }

                    &.is-next {
                        right: 0;

                        i {
                            position: relative;
                            right: -1px;
                        }
                    }

                    &:hover {
                        border-color: darken($fade-grey, 4%);
                        background: $white;
                        box-shadow: $light-box-shadow;
                    }

                    svg {
                        height: 16px;
                        width: 16px;
                        color: $primary;
                        transition: all 0.3s;
                    }
                }
            }

            .restaurants-list {
                padding: 30px 0;

                .restaurants-list-item {
                    @include vuero-l-card();

                    position: relative;
                    padding: 0;
                    border: none;
                    background: none;

                    .image-container {
                        position: relative;

                        > img {
                            display: block;
                            object-fit: cover;
                            border-radius: 24px;
                            min-height: 180px;
                            max-height: 180px;
                            width: 100%;
                        }

                        .timer {
                            position: absolute;
                            bottom: 10px;
                            left: 10px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 50px;
                            width: 50px;
                            border-radius: 12px;
                            background: $primary;
                            border: 1px solid $primary;
                            font-family: $font;
                            text-align: center;

                            span {
                                display: block;

                                &:first-child {
                                    font-size: 1.3rem;
                                    color: $smoke-white;
                                    font-weight: 600;
                                    line-height: 1;
                                }

                                &:nth-child(2) {
                                    font-size: 0.7rem;
                                    text-transform: uppercase;
                                    color: lighten($primary, 40%);
                                }
                            }
                        }
                    }

                    .meta-container {
                        display: flex;
                        align-items: center;
                        padding: 5px 5px;

                        .meta-icon {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 46px;
                            min-width: 46px;
                            height: 46px;
                            max-height: 46px;
                            background: $white;
                            border: 1px solid darken($fade-grey, 3%);
                            border-radius: 500px;

                            img {
                                display: flex;
                                height: 22px;
                                width: 22px;
                            }
                        }

                        .meta-content {
                            margin-left: 8px;
                            font-family: $font;
                            line-height: 1.3;

                            h4 {
                                font-family: $font-alt;
                                font-weight: 600;
                                font-size: 1rem;
                                color: $dark-text;
                            }

                            p {
                                display: flex;
                                align-items: center;

                                .fa-circle {
                                    font-size: 5px;
                                    margin: 0 10px;
                                }

                                .fa-star {
                                    position: relative;
                                    top: -1px;
                                    font-size: 12px;
                                    color: #fab82a;

                                    + span {
                                        color: $dark-text;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    > .right {
        width: 30%;
        padding: 0 0 0 20px;

        .sticky-panel {
            position: fixed;
            height: calc(100% - 100px);
            transition: all 0.3s;
            width: 336px;

            &.is-stretched {
                height: calc(100% - 30px);
                top: 10px;
            }

            .icon-toolbar-widget {
                width: 100%;
            }

            .side-section {
                display: none;
                animation: fadeInLeft 0.5s;

                &.is-active {
                    display: block;
                }
            }

            .cart-widget {
                .section-placeholder {
                    height: calc(100% - 160px);

                    img {
                        max-width: 90px;
                        margin: 0 auto 10px auto;
                    }
                }

                .cart-items {
                    height: calc(100% - 160px);
                    border-bottom: 1px solid darken($fade-grey, 3%);
                    padding-bottom: 40px;
                    overflow-y: auto;

                    .cart-item {
                        align-items: center;

                        .price {
                            margin: 0;
                            font-size: 0.9rem;
                            font-weight: 500;
                        }
                    }
                }

                .cart-button {
                    .total {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px 5px;

                        span {
                            font-family: $font;
                            margin: 0;

                            &:first-child {
                                font-size: 1rem;
                                font-weight: 500;
                                color: $light-text;
                                text-transform: uppercase;
                            }

                            &:nth-child(2) {
                                color: $dark-text;
                                font-weight: 600;
                                font-size: 1.4rem;
                            }
                        }
                    }
                }
            }
        }
    }
}

.is-dark {
    .food-delivery-dashboard {
        .left {
            .left-header {
                background: lighten($dark-sidebar, 2%) !important;

                .header-meta {
                    h3 {
                        color: $dark-dark-text;
                    }

                    p {
                        color: $accent;
                    }
                }
            }

            .left-body {
                .restaurants {
                    .restaurants-toolbar {
                        .left {
                            h3 {
                                color: $dark-dark-text;
                            }
                        }
                    }

                    .restaurants-list {
                        .restaurants-list-item {
                            @include vuero-card--dark();

                            background: none;
                            border: none;

                            .image-container {
                                .timer {
                                    background: $accent;
                                    border-color: $accent;

                                    span {
                                        &:nth-child(2) {
                                            color: lighten($accent, 18%);
                                        }
                                    }
                                }
                            }

                            .meta-container {
                                .meta-icon {
                                    background: lighten($fade-grey, 3%);
                                    border-color: lighten($fade-grey, 3%);
                                }

                                .meta-content {
                                    h4 {
                                        color: $dark-dark-text;
                                    }

                                    p {
                                        .fa-star {
                                            color: $accent;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .right {
            .cart-widget {
                .cart-items {
                    border-color: lighten($dark-sidebar, 12%) !important;
                }

                .cart-button {
                    .total {
                        span {
                            &:first-child {
                                color: $light-text;
                            }

                            &:nth-child(2) {
                                color: $dark-dark-text;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .food-delivery-dashboard {
        flex-direction: column;

        .left,
        .right {
            width: 100%;
            padding: 0;
        }

        .left {
            .left-header {
                flex-direction: column;
                text-align: center;

                .header-image {
                    img {
                        left: 0;
                    }
                }
            }

            .restaurants-list {
                .restaurants-list-item {
                    .image-container {
                        img {
                            min-height: 220px !important;
                            max-height: 220px !important;
                        }
                    }
                }
            }
        }

        .right {
            .sticky-panel {
                position: static;
                width: 100% !important;
            }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .food-delivery-dashboard {
        flex-direction: column;

        .left,
        .right {
            width: 100%;
            padding: 0;
        }

        .left {
            .restaurants-list {
                .columns {
                    display: flex;

                    .column {
                        min-width: 50%;
                    }
                }

                .restaurants-list-item {
                    .image-container {
                        img {
                            min-height: 220px !important;
                            max-height: 220px !important;
                        }
                    }
                }
            }
        }

        .right {
            .sticky-panel {
                position: static;
                width: 100% !important;
            }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    .food-delivery-dashboard {
        .left {
            .left-body {
                .restaurants-list {
                    .restaurants-list-item {
                        .image-container {
                            > img {
                                min-height: 140px !important;
                                max-height: 140px !important;
                            }
                        }
                    }
                }
            }
        }

        .right {
            .sticky-panel {
                max-width: 255px;
            }
        }
    }
}
</style>
