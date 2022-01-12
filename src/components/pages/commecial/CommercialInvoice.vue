<script setup lang="ts">
import { popovers } from "/@src/data/users/userPopovers"
import useNotyf from "/@src/composable/useNotyf"
import { useRouter } from "vue-router"
import { ref } from "vue"

const router = useRouter()
const notif = useNotyf()
const invoice = ref()
const isLoading = ref(true)

if (!isLoading.value) {
    isLoading.value = true
}

api.get("commercial/invoice/6064")
    .then(response => {
        invoice.value = response.data.response.propostascomerciais[0].propostacomercial
    })
    .catch(() => {
        notif.error("Não foi possível encontrar a proposta comercial, tente novamente mais tarde.")
        router.push({
            name: "index",
        })
    })
    .finally(() => (isLoading.value = false))
</script>

<template>
    <VLoader :active="isLoading" size="large">
        <div v-if="!invoice" class="invoice-wrapper">
            <div class="fix-loading">...</div>
        </div>
        <div v-if="invoice" class="invoice-wrapper">
            <div class="invoice-header">
                <div class="left">
                    <h3>Proposta #{{ invoice.numeroProposta }}</h3>
                </div>
                <div class="right">
                    <div class="controls">
                        <a class="action">
                            <i aria-hidden="true" class="iconify" data-icon="feather:printer"></i>
                        </a>
                        <a class="action">
                            <i aria-hidden="true" class="iconify" data-icon="feather:download-cloud"></i>
                        </a>
                        <a class="action">
                            <i aria-hidden="true" class="iconify" data-icon="feather:mail"></i>
                        </a>
                        <a class="action">
                            <i aria-hidden="true" class="iconify" data-icon="feather:arrow-left"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="invoice-body">
                <div class="invoice-card">
                    <div class="invoice-section is-flex is-bordered">
                        <tippy class="has-help-cursor" interactive placement="bottom-start">
                            <V-Avatar size="large" picture="/demo/avatars/13.jpg" />
                            <template #content>
                                <UserPopoverContent :user="popovers.user13" />
                            </template>
                        </tippy>

                        <div class="meta">
                            <h3>{{ invoice.cliente.nome }}</h3>
                            <span v-if="invoice.cliente.cpfCnpj.length >= 14">
                                CNPJ: {{ invoice.cliente.cpfCnpj }}
                            </span>
                            <span v-else> CPF: {{ invoice.cliente.cpfCnpj }} </span>
                            <span>{{ invoice.cliente.celular }}</span>
                            <span v-if="invoice.cliente.fone">
                                {{ invoice.cliente.fone }}
                            </span>
                            <span>{{ invoice.cliente.email }}</span>
                        </div>
                        <div class="end" style="min-width: 200px">
                            <h3>Proposta #{{ invoice.numeroProposta }}</h3>
                            <br />
                            <span
                                >Abertura: <b> {{ invoice.data }}</b>
                            </span>
                            <span>
                                Atendente:
                                <b> {{ invoice.vendedor }} </b>
                            </span>
                            <span>
                                Responsavel:
                                <b> {{ invoice.aosCuidadosDe }} </b>
                            </span>
                        </div>
                    </div>

                    <div class="invoice-section is-flex is-bordered">
                        <div class="meta">
                            <h3>Status da Proposta</h3>
                            <br />
                            <p>
                                <VMessage v-if="invoice.situacao == 'Concluído'" color="success">
                                    Proposta Concluida
                                </VMessage>
                                <VMessage v-if="invoice.situacao == 'Aprovado'" color="success">
                                    Proposta Concluida
                                </VMessage>
                                <VMessage v-else-if="invoice.situacao == 'Não aprovado'" color="danger">
                                    Proposta Cancelada
                                </VMessage>
                                <VMessage v-else color="primary"> Aguardando Pagamento </VMessage>
                            </p>
                        </div>
                        <div class="end is-left">
                            <h3>Endereço</h3>
                            <p>
                                <span v-if="invoice.cliente.endereco"> {{ invoice.cliente.endereco }}, </span>
                                <span v-if="invoice.cliente.numero"> {{ invoice.cliente.numero }}, </span>
                                <span v-if="invoice.cliente.complemento">
                                    {{ invoice.cliente.complemento }}
                                </span>

                                <span>
                                    {{ invoice.cliente.bairro }}, {{ invoice.cliente.cidade }},
                                    {{ invoice.cliente.uf }},
                                </span>
                                <span>{{ invoice.cliente.cep }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="invoice-section">
                        <div class="flex-table">
                            <!--Table header-->
                            <div class="flex-table-header">
                                <span class="is-grow">Produto</span>
                                <span class="cell-end">Quantidade</span>
                            </div>

                            <!--Table item-->
                            <div v-for="(V, K) in invoice.itens" :key="K" class="flex-table-item">
                                <div class="flex-table-cell is-grow" data-th="">
                                    <span class="dark-text"> {{ V.item.descricao }}</span>
                                </div>

                                <div class="flex-table-cell" data-th="Quantity">
                                    <span class="light-text">
                                        <h3 class="h-3">
                                            {{ parseInt(V.item.quantidade).toFixed(0) }}
                                        </h3>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </VLoader>
</template>

<style lang="scss">
@import "../../../scss/abstracts/_variables.scss";
@import "../../../scss/abstracts/_mixins.scss";

/* ==========================================================================
4. Invoice
========================================================================== */
.fix-loading {
    display: block;
    height: 500px;
}
.invoice-wrapper {
    max-width: 740px;
    margin: 0 auto;

    &.is-navbar {
        margin-top: 30px;
    }

    .invoice-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid darken($fade-grey, 4%);

        .left {
            h3 {
                font-family: $font-alt;
                font-size: 1.2rem;
                font-weight: 600;
                color: $dark-text;
            }
        }

        .right {
            .controls {
                display: flex;

                .action {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 32px;
                    width: 32px;
                    min-width: 32px;
                    border-radius: $radius-rounded;
                    color: $light-text;
                    margin: 0 4px;
                    transition: all 0.3s;

                    &:hover {
                        color: $dark-text;
                        background: darken($fade-grey, 4%);
                    }

                    svg {
                        height: 16px;
                        width: 16px;
                        stroke-width: 1.6px;
                    }
                }
            }
        }
    }

    .invoice-body {
        .invoice-card {
            @include vuero-s-card();

            padding: 0;

            .invoice-section {
                padding: 40px;

                &.is-flex {
                    display: flex;
                    align-items: center;

                    .meta {
                        margin-left: 16px;
                        font-family: $font;

                        h3 {
                            font-family: $font-alt;
                            font-size: 1.1rem;
                            font-weight: 600;
                            line-height: 1;
                        }

                        span {
                            display: block;
                            color: $light-text;
                            font-weight: 400;
                            font-size: 0.9rem;
                        }
                    }

                    .end {
                        margin-left: auto;
                        text-align: right;

                        &.is-left {
                            text-align: left;
                            max-width: 300px;

                            p {
                                padding-top: 4px;
                                font-size: 0.95rem;
                                line-height: 1.2;
                            }
                        }

                        h3 {
                            font-family: $font-alt;
                            font-size: 1.1rem;
                            font-weight: 600;
                            line-height: 1;
                        }

                        span {
                            display: block;
                            color: $light-text;
                            font-weight: 400;
                            font-size: 0.9rem;
                        }
                    }
                }

                &.is-bordered {
                    border-bottom: 1px solid darken($fade-grey, 3%);
                }

                .v-avatar {
                    &.is-customer {
                        border: 1.6px solid darken($fade-grey, 3%);
                        border-radius: $radius-rounded;
                        box-shadow: $light-box-shadow;
                    }
                }

                .flex-table {
                    &.sub-table {
                        .flex-table-item {
                            padding-top: 0;
                            padding-bottom: 0;
                            margin-bottom: 0;
                            min-height: 40px;
                            border: none;

                            .table-label {
                                font-family: $font;
                                text-transform: uppercase;
                                font-size: 0.8rem;
                                color: $light-text;
                            }

                            .table-total {
                                font-family: $font;
                                color: $dark-text;
                                font-weight: 500;

                                &.is-bigger {
                                    font-size: 1.2rem;
                                    font-weight: 600;
                                }
                            }
                        }
                    }

                    .flex-table-header {
                        span {
                            &:not(:first-child) {
                                justify-content: flex-end;
                            }
                        }
                    }

                    .flex-table-item {
                        .flex-table-cell {
                            &:not(:first-child) {
                                justify-content: flex-end;
                            }
                        }
                    }
                }
            }
        }
    }
}

/* ==========================================================================
5. Invoice Dark mode
========================================================================== */

.is-dark {
    .invoice-wrapper {
        .invoice-header {
            border-color: lighten($dark-sidebar, 20%);

            .left {
                h3 {
                    color: $dark-dark-text;
                }
            }

            .right {
                .controls {
                    .action {
                        border: 1px solid transparent;

                        &:hover {
                            background: lighten($dark-sidebar, 2%);
                            border-color: $accent;
                            color: $accent;
                        }
                    }
                }
            }
        }

        .invoice-body {
            .invoice-card {
                @include vuero-card--dark();
            }
        }

        .invoice-section {
            border-color: lighten($dark-sidebar, 12%) !important;

            &.is-flex {
                .v-avatar {
                    border-color: lighten($dark-sidebar, 12%) !important;
                }

                .meta,
                .end {
                    h3 {
                        color: $dark-dark-text;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .invoice-wrapper {
        .invoice-section {
            &.is-flex {
                flex-direction: column;
                text-align: center;

                .v-avatar {
                    margin-bottom: 16px;
                }

                .meta {
                    margin-left: 0 !important;
                }

                .end {
                    margin: 16px auto 0 auto;
                    text-align: center !important;
                }
            }

            .flex-table {
                &.sub-table {
                    padding-top: 16px;

                    .is-vhidden {
                        display: none !important;
                    }

                    .flex-table-item:not(.is-vhidden) {
                        flex-direction: revert !important;
                    }
                }

                .flex-table-item {
                    .flex-table-cell {
                        &.is-grow {
                            > span {
                                margin-left: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
