<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core"
import { computed, ref, reactive } from "vue"
import useUserSession from "/@src/composable/useUserSession"
import useApi from "/@src/composable/useApi"
import useNotyf from "/@src/composable/useNotyf"
import { useI18n } from "vue-i18n"
import { Form } from "vee-validate"
import * as yup from "yup"

import { products, cardOption, cordOption, rollerOption, maskOption, credOption } from "/@src/data/alternativa/products"

const { locale, t } = useI18n()

const isLoading = ref(false)
const notif = useNotyf()
const session = useUserSession()
const api = useApi()
const invoiceNumber = ref("0000")
const goNext = ref()
const valuesInvoice = reactive({})
const { y } = useWindowScroll()

const isStuck = computed(() => {
    return y.value > 30
})

// == [ Form Schema ] ============>

const testing: Boolean = false

const schemaInvoice = yup.object().shape({
    ticket: yup.string().required(t("validation.required")).url("Informe uma URL valida."),
    responsible: yup.string().required(t("validation.required")).min(3, "O nome deve ter no mínimo 3 caracteres"),
    customer: yup.string().required(t("validation.required")).min(3, "Informe o nome do cliente ou empresa"),
    cpfCnpj: yup.string().required(t("validation.required")).min(11, "Informe um CPF ou CNPJ válido"),
    email: yup
        .string()
        .email("Informe um email valido")
        .required(t("validation.required"))
        .min(5, "O email deve conter no mínimo 5 caracteres"),
    cell: yup.string().required(t("validation.required")).min(10, "Informe um telefone valido"),
    address: yup.string().required(t("validation.required")).min(4, "Informe um endereço valido"),

    seller: yup.string().required(t("validation.required")),
    number: yup.string().required(t("validation.required")),
    district: yup.string().required(t("validation.required")),
    city: yup.string().required(t("validation.required")),
    state: yup.string().required(t("validation.required")),
    info: yup.string().required(t("validation.required")),
    complement: yup.string().required(t("validation.required")),
    cep: yup.string().required(t("validation.required")),
    payment: yup.string().required(t("validation.required")),

    // ==[ Card Option ]============>
    card: yup.boolean(),
    card_print: yup.string().when("card", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
    card_hole: yup.string().when("card", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
    card_chip: yup.string().when("card", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),

    // ==[ cord Option ]============>
    cord: yup.boolean(),
    cord_depth: yup.string().when("cord", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
    cord_closure: yup.string().when("cord", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
    cord_finishing: yup.string().when("cord", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),

    // ==[ Roller Clips Option ]============>
    roller: yup.boolean(),
    roller_color: yup.string().when("roller", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
    roller_finishing: yup.string().when("roller", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),

    // ==[ Masks Option ]============>
    mask: yup.boolean(),
    mask_size: yup.string().when("mask", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
    mask_color: yup.string().when("mask", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),

    // ==[ Credential Option ]============>
    cred: yup.boolean(),
    cred_print: yup.string().when("cred", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
    cred_hole: yup.string().when("cred", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
    cred_size: yup.string().when("cred", {
        is: true,
        then: yup.string().required(t("validation.required")),
        otherwise: yup.string(),
    }),
})

const paymentOptions = [
    {
        value: 50,
        text: "Pagamento 50%",
    },
    {
        value: 100,
        text: "Pagamento 100%",
    },
    {
        value: 0,
        text: "Pagamento Faturado",
    },
]

const handleSearch = async () => {
    if (!isLoading.value) {
        isLoading.value = true

        api.get("commercial/invoice/" + invoiceNumber.value)
            .then((response) => {
                goNext.value = true

                const res = response.data.response.propostascomerciais[0].propostacomercial

                const data = {
                    orderid: res.numeroProposta,
                    responsible: res.aosCuidadosDe,
                    seller: res.vendedor,
                    customer: res.cliente.nome,
                    cpfCnpj: res.cliente.cpfCnpj,
                    email: res.cliente.email,
                    cell: res.cliente.celular,
                    phone: res.cliente.fone,
                    address: res.cliente.endereco,
                    number: res.cliente.numero,
                    district: res.cliente.bairro,
                    city: res.cliente.cidade,
                    state: res.cliente.uf,
                    complement: res.cliente.complemento,
                    cep: res.cliente.cep,
                }
                Object.assign(valuesInvoice, data)
            })
            .catch((error) => {
                notif.error("Não foi possivel encontrar a proposta comercial, tente novamente mais tarde.")
            })
            .finally(() => (isLoading.value = false))
    }
}

//==[ START // Invoice Form ]====>
const handleInvoice = async (values: String) => {
    if (
        products.value[0].checked ||
        products.value[1].checked ||
        products.value[2].checked ||
        products.value[3].checked
    ) {
        // console.log(cardOption.input[0].value)
        notif.success("TUDO CERTO, PASSOU")
    } else {
        notif.error("Oops, você precisa selecionar pelo menos um produto para prosseguir.")
    }
}

const invalidInvoice = async (values: String) => {
    // ==[ Create Object ]======>
    Object.assign(valuesInvoice, values.values)

    console.log(JSON.stringify(valuesInvoice, null, 2))

    notif.error("Oops, parece que você não preencheu todos os campos obrigatórios, verifique o formulario.")
}
</script>

<template>
    <div v-if="!goNext" class="confirm-account-wrapper">
        <div class="wrapper-inner">
            <div class="action-box">
                <div class="box-content">
                    <img class="light-image" src="/@src/assets/illustrations/placeholders/launch.svg" alt="" />
                    <img class="dark-image" src="/@src/assets/illustrations/placeholders/launch-dark.svg" alt="" />
                    <h3 class="dark-inverted">Registrar Proposta</h3>
                    <p>
                        Olá, <b>Wladi Veras</b> informe o numero da proposta comercial para dar continuidade ao processo
                        de registro da proposta.
                    </p>

                    <br />
                    <VField>
                        <VControl>
                            <VIMaskInput
                                v-model="invoiceNumber"
                                class="input invoice-number"
                                :options="{
                                    mask: '0000',
                                }"
                                placeholder="0000"
                            />
                        </VControl>
                    </VField>
                    <div class="buttons">
                        <V-Button color="primary" :loading="isLoading" raised @click="handleSearch">
                            Continuar
                        </V-Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Form
        v-if="goNext"
        class="form-layout"
        :validation-schema="schemaInvoice"
        :initial-values="valuesInvoice"
        @submit="handleInvoice"
        @invalid-submit="invalidInvoice"
    >
        <div class="form-outer">
            <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
                <div class="form-header-inner">
                    <div class="left">
                        <h3>Proposta #{{ valuesInvoice.orderid }}</h3>
                    </div>

                    <div class="right">
                        <div class="buttons">
                            <V-Button
                                icon="lnir lnir-arrow-left rem-100"
                                :to="{ name: 'commercial' }"
                                light
                                dark-outlined
                            >
                                Cancelar
                            </V-Button>
                            <V-Button type="submit" color="primary" raised> Registrar Proposta </V-Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-body">
                <VMessage color="success"> Atenção Wladi Veras, esse cliente é recorrente. </VMessage>
                <!--Fieldset-->
                <div class="form-fieldset">
                    <div class="fieldset-heading"></div>

                    <div class="columns is-multiline">
                        <div class="column is-6">
                            <TextInput icon="feather:user" type="text" name="responsible" label="Responsavel" />
                        </div>

                        <div class="column is-6">
                            <TextInput icon="feather:user" type="text" name="seller" label="Vendedor" disabled />
                        </div>
                    </div>
                </div>
                <!--Fieldset-->
                <div class="form-fieldset">
                    <div class="fieldset-heading">
                        <h4>Pagamento</h4>
                        <p>Informações de pagamento da proposta</p>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-6">
                            <SelectInput
                                name="payment"
                                label="Tipo de Pagamento"
                                placeholder="Tipo de pagamento..."
                                :items="paymentOptions"
                            />
                        </div>

                        <div class="column is-6">
                            <TextInput icon="feather:user" type="text" name="ticket" label="Link do Boleto" />
                        </div>
                    </div>
                </div>
                <!--Fieldset-->
                <div class="form-fieldset">
                    <div class="fieldset-heading">
                        <h4>Informações</h4>
                        <p>Informações e contato do cliente</p>
                    </div>

                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <TextInput icon="feather:user" type="text" name="customer" label="Cliente" />
                        </div>
                        <div class="column is-6">
                            <TextInput
                                v-mask="['###.###.###-##', '##.###.###/####-##']"
                                icon="feather:clipboard"
                                type="text"
                                name="cpfCnpj"
                                label="CPF ou CNPJ"
                            />
                        </div>
                        <div class="column is-6">
                            <TextInput icon="feather:mail" type="text" name="email" label="E-mail" />
                        </div>
                        <div class="column is-6">
                            <TextInput
                                v-mask="['(##) ####-####', '(##) #####-####']"
                                icon="feather:phone"
                                type="text"
                                name="cell"
                                label="Celular"
                            />
                        </div>
                        <div class="column is-6">
                            <TextInput
                                v-mask="['(##) ####-####', '(##) #####-####']"
                                icon="feather:phone"
                                type="text"
                                name="phone"
                                label="Telefone"
                            />
                        </div>
                    </div>
                </div>
                <!--Fieldset-->
                <div class="form-fieldset">
                    <div class="fieldset-heading">
                        <h4>Endereço</h4>
                        <p>Endereço de cadastro do cliente</p>
                    </div>

                    <div class="columns is-multiline">
                        <div class="column is-9">
                            <TextInput icon="feather:map-pin" type="text" name="address" label="Endereço" />
                        </div>
                        <div class="column is-3">
                            <TextInput icon="feather:hash" type="text" name="number" label="Numero" />
                        </div>

                        <div class="column is-5">
                            <TextInput icon="feather:map-pin" type="text" name="district" label="Bairro" />
                        </div>
                        <div class="column is-4">
                            <TextInput icon="feather:map" type="text" name="city" label="Cidade" />
                        </div>
                        <div class="column is-3">
                            <TextInput icon="feather:map" type="text" name="state" label="Estado" />
                        </div>

                        <div class="column is-8">
                            <TextInput icon="feather:alert-circle" type="text" name="complement" label="Complemento" />
                        </div>

                        <div class="column is-4">
                            <TextInput v-mask="'######-##'" icon="feather:map" type="text" name="cep" label="Cep" />
                        </div>

                        <div class="column is-12">
                            <TextArea type="text" name="info" row="5" spellcheck label="informações Adicionais" />
                        </div>
                    </div>
                </div>

                <!--Fieldset-->
                <div class="form-fieldset">
                    <div class="fieldset-heading">
                        <h4>Produtos</h4>
                        <p>Informações sobre os produtos da proposta</p>
                    </div>

                    <div class="tools-wrapper">
                        <div class="columns is-multiline">
                            <!--Tool-->
                            <div v-for="(V, K) in products" :key="K" class="column is-6">
                                <BigCheck v-model="V.checked" :name="V.model" :title="V.name" :label="V.description" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Products -->
                <div v-for="(V, K) in products" :key="K">
                    <div v-if="V.checked" class="form-fieldset">
                        <div class="fieldset-heading">
                            <h4>{{ V.name }}</h4>
                            <p>{{ V.description }}</p>
                        </div>
                        <div class="tools-wrapper">
                            <!-- Cartão PVC -->
                            <div v-if="V.model === 'card'" class="columns is-multiline">
                                <div v-for="(CV, CK) in cardOption.input" :key="CK" class="column is-6">
                                    <SelectInput
                                        v-model="CV.value"
                                        :label="CV.placeholder"
                                        :name="V.model + '_' + CV.name"
                                        :items="CV.options"
                                        :placeholder="CV.placeholder"
                                    />
                                </div>
                            </div>
                            <!-- Cordão Personalizado -->
                            <div v-if="V.model === 'cord'" class="columns is-multiline">
                                <div v-for="(CV, CK) in cordOption.input" :key="CK" class="column is-6">
                                    <SelectInput
                                        v-model="CV.value"
                                        :label="CV.placeholder"
                                        :name="V.model + '_' + CV.name"
                                        :items="CV.options"
                                        :placeholder="CV.placeholder"
                                    />
                                </div>
                            </div>
                            <!-- Roller Clip -->
                            <div v-if="V.model === 'roller'" class="columns is-multiline">
                                <div v-for="(CV, CK) in rollerOption.input" :key="CK" class="column is-6">
                                    <SelectInput
                                        v-model="CV.value"
                                        :label="CV.placeholder"
                                        :name="V.model + '_' + CV.name"
                                        :items="CV.options"
                                        :placeholder="CV.placeholder"
                                    />
                                </div>
                            </div>
                            <!-- Mascaras  -->
                            <div v-if="V.model === 'mask'" class="columns is-multiline">
                                <div v-for="(CV, CK) in maskOption.input" :key="CK" class="column is-6">
                                    <SelectInput
                                        v-model="CV.value"
                                        :label="CV.placeholder"
                                        :name="V.model + '_' + CV.name"
                                        :items="CV.options"
                                        :placeholder="CV.placeholder"
                                    />
                                </div>
                            </div>
                            <!-- Mascaras  -->
                            <div v-if="V.model === 'cred'" class="columns is-multiline">
                                <div v-for="(CV, CK) in credOption.input" :key="CK" class="column is-6">
                                    <SelectInput
                                        v-model="CV.value"
                                        :label="CV.placeholder"
                                        :name="V.model + '_' + CV.name"
                                        :items="CV.options"
                                        :placeholder="CV.placeholder"
                                    />
                                </div>
                            </div>
                            <div v-else></div>
                            <!-- END -->
                        </div>
                    </div>
                </div>
                <!--end-->
            </div>
        </div>
    </Form>
</template>

<style lang="scss">
@import "../../../scss/abstracts/_variables.scss";
@import "../../../scss/abstracts/_mixins.scss";
@import "../../../scss/pages/generic/_forms.scss";

/* ==========================================================================
1. Confirm Account
========================================================================== */

.invoice-number {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    max-width: 200px;
}
.tools-wrapper {
    max-width: 840px;
    margin: 0 auto;

    .tool-card {
        position: relative;

        input {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
            cursor: pointer;

            &:checked + .tool-card-inner {
                border-color: $primary;

                .flex-end {
                    .checkmark {
                        opacity: 1;
                    }
                }
            }
        }

        .tool-card-inner {
            padding: 12px;
            background: $white;
            border: 1px solid darken($fade-grey, 3%);
            border-radius: 10px;

            .media-flex-center {
                .flex-end {
                    .checkmark {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 28px;
                        width: 28px;
                        border: 1px solid darken($fade-grey, 3%);
                        border-radius: $radius-rounded;
                        box-shadow: $light-box-shadow;
                        opacity: 0;
                        color: $primary;
                        transition: all 0.3s;

                        svg {
                            height: 14px;
                            width: 14px;
                            stroke-width: 3px;
                        }
                    }
                }
            }
        }
    }
}
.confirm-account-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 540px;
    min-height: 560px;
    margin: 0 auto;

    .wrapper-inner {
        .action-box {
            @include vuero-s-card();

            padding: 40px;

            .box-content {
                text-align: center;
                font-family: $font;

                img {
                    display: block;
                    width: 100%;
                    max-width: 220px;
                    margin: 0 auto 8px auto;

                    &.is-larger {
                        max-width: 300px;
                    }
                }

                h3 {
                    font-size: 1.1rem;
                    font-family: $font-alt;
                    font-weight: 600;
                    max-width: 320px;
                    margin: 0 auto 8px auto;

                    span {
                        color: $primary;
                    }
                }

                p {
                    font-size: 0.9rem;
                }

                .buttons {
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    padding-top: 30px;

                    .button {
                        margin: 0 4px;
                        min-width: 180px;
                    }
                }
            }
        }
    }
}

.is-dark {
    .is-image-select .multiselect .select-label-text,
    .is-icon-select .multiselect .select-label-text {
        color: #a2a5b9;
    }
    .tools-wrapper {
        .tool-card {
            input:checked + .tool-card-inner {
                border-color: $accent !important;
            }

            .tool-card-inner {
                border-color: lighten($dark-sidebar, 12%);
                background: lighten($dark-sidebar, 3%);

                .media-flex-center {
                    .flex-end {
                        .checkmark {
                            border-color: lighten($dark-sidebar, 12%);
                            background: lighten($dark-sidebar, 2%);
                            color: $accent;
                        }
                    }
                }
            }
        }
    }
    .confirm-account-wrapper {
        .wrapper-inner {
            .action-box {
                @include vuero-card--dark();
            }
        }
        .wrapper-outer {
            @include vuero-card--dark();
        }
    }
}

@media only screen and (max-width: 767px) {
    .confirm-account-wrapper {
        .wrapper-inner {
            .action-box {
                padding: 20px;

                .box-content {
                    .buttons {
                        .button {
                            min-width: 130px;
                        }
                    }
                }
            }
        }
    }
}

.wizard-navigation {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    background: $white;
    padding: 0 20px;
    transition: all 0.3s;
    z-index: 99;

    .wizard-brand {
        img {
            display: block;
            height: 34px;
            margin: 0 auto;
        }
    }

    .navbar-item {
        &.is-wizard-title {
            margin-left: 15px;
            border-left: 1px solid lighten($muted-grey, 15%);
            padding-bottom: 6px;
            padding-top: 6px;
            font-family: $font;

            .title-wrap {
                position: relative;
                display: block;
                font-family: $font-alt;
                font-size: 1.2rem;
                font-weight: 600;

                span {
                    font-weight: 400;
                }
            }
        }
    }

    .wizard-dropdown {
        cursor: pointer;

        .is-trigger {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;

            svg {
                height: 18px;
                width: 18px;
                color: $light-text;
            }
        }

        .dropdown-menu {
            border: 1px solid darken($fade-grey, 3%);
            box-shadow: $light-box-shadow;
            border-radius: 8px;
            padding-top: 0;
            overflow: hidden;

            .dropdown-content {
                .dropdown-item {
                    font-family: $font;
                }
            }
        }
    }

    .is-dark-mode {
        margin-left: auto;
        background: transparent !important;

        .navbar-icon {
            height: 38px;
            width: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: $radius-rounded;
            border: 1px solid darken($fade-grey, 3%);
            box-shadow: $light-box-shadow;
            background: $white;
            transition: all 0.3s;

            .dark-mode {
                transform: scale(0.6);
            }
        }
    }

    .user-dropdown {
        .is-trigger {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            cursor: pointer;

            .profile-avatar {
                position: relative;

                .avatar {
                    display: block;
                    width: 38px;
                    height: 38px;
                    border-radius: $radius-rounded;
                }

                .badge {
                    position: absolute;
                    right: -8px;
                    bottom: 0;
                    width: 20px;
                    height: 20px;
                    border: 2px solid $white;
                    border-radius: $radius-rounded;
                }
            }

            svg {
                margin-left: 3px;
                width: 18px;
                height: 18px;
                color: $light-text;
                transition: all 0.3s;
            }
        }

        .dropdown-menu {
            top: 52px;
            border: 1px solid darken($fade-grey, 3%);
            box-shadow: $light-box-shadow;
            border-radius: 8px;
            padding-top: 0;
            width: 180px;
            overflow: hidden;

            .dropdown-item {
                display: flex;
                align-items: center;
                font-family: $font;
                font-size: 0.9rem;
                padding: 8px 12px;
                color: $light-text;

                p {
                    font-family: $font-alt;
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: $dark-text;
                }

                svg {
                    margin-right: 8px;
                    height: 16px;
                    width: 16px;
                    color: $light-text;
                }
            }
        }
    }
}
</style>
