<script setup lang="ts">
/*
 * 0 = Vazio
 * 1 = Cliente Novo
 * 2 = Recorrência
 * 3 = Aguardando Aprovação
 * 4 = Aprovado
 *
 *
 *
 */

const actions = [
    {
        date: "Set 30, 2021",
        hour: "13:20",
        action: "Pedido recebido pelo cliente .",
        user: {
            id: 1,
            name: "Herick",
            avatar: "https://i.pravatar.cc/300?img=1",
        },
    },
    {
        date: "Set 27, 2021",
        hour: "14:26",
        type: 3,
        code: "#BR034539459",
        action: "Postou o pedido nos correios, codigo de rastreio:",
        user: {
            id: 1,
            name: "Herick",
            avatar: "https://i.pravatar.cc/300?img=1",
        },
    },
    {
        date: "Set 26, 2021",
        hour: "15:18",
        type: 0,
        action: "finalizou a produção do pedido do cliente.",
        user: {
            id: 1,
            name: "Cosme",
            avatar: "https://i.pravatar.cc/300?img=1",
        },
    },
    {
        date: "Set 25, 2021",
        hour: "17:12",
        type: 2,
        action: "cliente aprovou o pedido para produção.",
        user: {
            id: 1,
            name: "Cliente",
            avatar: "#",
        },
    },
    {
        date: "Set 23, 2021",
        hour: "15:18",
        type: 1,
        action: "aprovou a solicitação de pedido do cliente",
        user: {
            id: 1,
            name: "Ana",
            avatar: "https://i.pravatar.cc/300?img=1",
        },
    },
]
</script>

<template>
    <div class="timeline-wrapper">
        <div class="timeline-header"></div>
        <div class="timeline-wrapper-inner">
            <div class="timeline-container">
                <!--Timeline item-->
                <div v-for="(V, K) in actions" :key="K" class="timeline-item">
                    <div class="date">
                        <span>{{ V.date }}</span>
                    </div>
                    <div class="dot"></div>
                    <div class="content-wrap">
                        <div class="content-box">
                            <div class="status"></div>
                            <V-Avatar :picture="V.user.avatar" />

                            <div class="box-text">
                                <div class="meta-text">
                                    <p>
                                        <a href="">{{ V.user.name }}</a> {{ V.action }}
                                        <V-Tag v-if="V.type == 1" label="Recorrência" color="purple" rounded />
                                        <V-Tag v-if="V.type == 2" label="Aprovado" color="green" rounded />
                                        <V-Tag v-if="V.type == 3" :label="V.code" color="blue" rounded />
                                    </p>
                                    <span>{{ V.hour }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Timeline item-->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../../../scss/abstracts/_variables.scss";
@import "../../../../scss/abstracts/_mixins.scss";

/*
  1. Timeline
  2. Timeline Dark mode
  3. Media Queries
*/

/* ==========================================================================
1. Timeline
========================================================================== */

.timeline-wrapper {
    max-width: 940px;
    margin: 0 auto;

    .timeline-wrapper-inner {
        padding-top: 30px;

        .timeline-container {
            .timeline-item {
                position: relative;
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                &::before {
                    content: "";
                    position: absolute;
                    top: 46px;
                    left: 111px;
                    height: 100%;
                    width: 2px;
                    background: $placeholder;
                    z-index: 0;
                }

                &:last-child {
                    &::before {
                        display: none;
                    }
                }

                &.is-unread {
                    .content-wrap {
                        .content-box {
                            .status {
                                background: $h-red !important;
                            }
                        }
                    }
                }

                .date {
                    width: 80px;
                    font-family: $font;
                    text-align: right;

                    span {
                        font-size: 0.9rem;
                        color: $light-text;
                    }
                }

                .dot {
                    position: relative;
                    height: 14px;
                    width: 14px;
                    border-radius: $radius-rounded;
                    border: 2.6px solid $primary;
                    margin: 0 25px;
                    z-index: 1;

                    &.is-info {
                        border-color: $info;
                    }

                    &.is-success {
                        border-color: $success;
                    }

                    &.is-warning {
                        border-color: $warning;
                    }

                    &.is-danger {
                        border-color: $danger;
                    }

                    &.is-purple {
                        border-color: $h-purple;
                    }
                }

                .content-wrap {
                    @include vuero-s-card();

                    flex-grow: 2;

                    .content-box {
                        display: flex;
                        align-items: center;

                        .status {
                            height: 8px;
                            width: 8px;
                            min-width: 8px;
                            border-radius: $radius-rounded;
                            background: lighten($light-text, 15%);
                            margin: 0 16px 0 0;
                        }

                        .box-text {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-left: 12px;
                            flex-grow: 2;

                            .meta-text {
                                line-height: 1.2;

                                p {
                                    color: darken($light-text, 10%);

                                    span {
                                        font-family: $font-alt;
                                        color: $dark-text;
                                        font-weight: 600;
                                    }

                                    a {
                                        color: $primary;
                                    }

                                    .tag {
                                        position: relative;
                                        top: -1px;
                                        font-weight: 500;
                                        line-height: 1.8;
                                        height: 1.8em;
                                        margin: 0 2px;
                                    }
                                }

                                > span {
                                    color: $light-text;
                                    font-size: 0.9rem;
                                }
                            }
                        }

                        .box-end {
                            margin-left: auto;

                            .v-avatar {
                                margin: 0 2px;
                            }
                        }
                    }

                    .meta-content {
                        padding-left: 78px;
                    }
                }
            }
        }

        .load-more-wrap {
            padding: 40px 0;

            .button {
                min-width: 240px;
                min-height: 50px;
                text-transform: uppercase;
                font-size: 0.85rem;
                font-weight: 500;
                color: $light-text;
            }
        }
    }
}

/* ==========================================================================
2. Timeline Dark mode
========================================================================== */

.is-dark {
    .timeline-wrapper {
        .timeline-wrapper-inner {
            .timeline-container {
                .timeline-item {
                    &::before {
                        background: lighten($dark-sidebar, 20%);
                    }

                    .content-wrap {
                        @include vuero-card--dark();

                        .content-box {
                            .status {
                                background: lighten($dark-sidebar, 20%);
                            }

                            .box-text {
                                .meta-text {
                                    p {
                                        span {
                                            color: $dark-dark-text;
                                        }

                                        a {
                                            color: $accent;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .load-more-wrap {
                .button {
                    background: lighten($dark-sidebar, 2%) !important;
                }
            }
        }
    }
}

/* ==========================================================================
3. Media Queries
========================================================================== */

@media only screen and (max-width: 767px) {
    .timeline-wrapper {
        .timeline-wrapper-inner {
            padding-top: 0;

            .timeline-container {
                .timeline-item {
                    flex-direction: column;

                    &::before {
                        display: none;
                    }

                    .dot {
                        display: none;
                    }

                    .date {
                        align-self: end;
                        margin-bottom: 4px;
                    }

                    .content-wrap {
                        .content-box {
                            .box-end {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .timeline-wrapper {
        .timeline-wrapper-inner {
            padding-top: 0;

            .timeline-container {
                .timeline-item {
                    flex-direction: column;

                    &::before {
                        display: none;
                    }

                    .dot {
                        display: none;
                    }

                    .date {
                        align-self: end;
                        margin-bottom: 4px;
                    }

                    .content-wrap {
                        .content-box {
                            .box-end {
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
