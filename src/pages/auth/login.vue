<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useHead } from "@vueuse/head"
import { useI18n } from "vue-i18n"
import { isDark } from "/@src/state/darkModeState"
import useNotyf from "/@src/composable/useNotyf"
import { Form, Field } from "vee-validate"
import { useStore } from "vuex"
import * as yup from "yup"

type StepId = "login" | "forgot-password"
const step = ref<StepId>("login")
const isLoading = ref(false)
const router = useRouter()
const notif = useNotyf()
const store = useStore()
const { t } = useI18n()

//==[ START // Login Form ]====>
const schemaLogin = yup.object().shape({
    email: yup
        .string()
        .email("Informe um email valido")
        .required(t("validation.required"))
        .min(5, "O email deve conter no mínimo 5 caracteres"),
    password: yup.string().required(t("validation.required")).min(6, "A senha deve conter no mínimo 6 caracteres"),
})

const handleLogin = async values => {
    isLoading.value = true

    const data = {
        email: values.email,
        password: values.password,
    }

    store
        .dispatch("login", { data })
        .then(response => {
            notif.success("Bem vindo de volta " + response.response.user.name)
            router.push("/")
        })
        .catch(() => {
            notif.error("Não foi possível se conectar, verifique os dados e tente novamente")
        })
        .finally(() => (isLoading.value = false))
}

const invalidLogin = async () => {
    notif.error("Não foi possível validar as informações, verifique os campos e tente novamente")
}
//==[ END // Login Form ]====>

useHead({
    title: "Conecte-se - Alternativa",
})
</script>

<template>
    <div class="modern-login">
        <div class="underlay h-hidden-mobile h-hidden-tablet-p"></div>

        <div class="columns is-gapless is-vcentered">
            <div class="column is-relative is-8 h-hidden-mobile h-hidden-tablet-p">
                <div class="hero is-fullheight is-image">
                    <div class="hero-body">
                        <div class="container">
                            <div class="columns">
                                <div class="column">
                                    <img class="hero-image" src="/@src/assets/illustrations/login/station.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-4 is-relative">
                <RouterLink :to="{ name: 'index' }" class="top-logo">
                    <AnimatedLogo width="38px" height="38px" />
                </RouterLink>
                <label class="dark-mode ml-auto">
                    <input
                        type="checkbox"
                        :checked="!isDark"
                        @change="
                            event => {
                                // @ts-ignore: Unreachable code error
                                isDark = !event.target.checked
                            }
                        "
                    />
                    <span></span>
                </label>
                <div class="is-form">
                    <div class="hero-body">
                        <div class="form-text">
                            <h2>Alternativa</h2>

                            <p>Conecte-se conosco.</p>
                        </div>
                        <div class="form-text is-hidden">
                            <h2>Recuperar conta</h2>
                            <p>Recrie a senha da sua conta.</p>
                        </div>

                        <Form
                            class="login-wrapper form-layout"
                            :validation-schema="schemaLogin"
                            @submit="handleLogin"
                            @invalid-submit="invalidLogin"
                        >
                            <TextInputRounded type="text" name="email" icon="feather:mail" label="email" />

                            <TextInputRounded type="password" name="password" icon="feather:lock" label="Senha" />

                            <div class="control is-flex">
                                <V-Button
                                    :loading="isLoading"
                                    color="primary"
                                    type="submit"
                                    size="big"
                                    rounded
                                    raised
                                    bold
                                >
                                    Conectar-se
                                </V-Button>
                                <a @click="step = 'forgot-password'">Esqueceu sua senha?</a>
                            </div>
                            <d iv class="button-wrap has-help"></d>
                        </Form>

                        <form
                            :class="[step !== 'forgot-password' && 'is-hidden']"
                            class="login-wrapper"
                            @submit.prevent
                        >
                            <p class="recover-text">
                                Digite seu endereço de email e clique no botão confirmar para que o processo de
                                recuperação de senha seja iniciado. Você receberá um email com os passos para completar
                                o procedimento.
                            </p>
                            <div class="control has-validation">
                                <input type="text" class="input" autocomplete="email" />
                                <small class="error-text">This is a required field</small>
                                <div class="auth-label">Endereço de Email</div>
                                <div class="autv-icon">
                                    <i aria-hidden="true" class="lnil lnil-envelope"></i>
                                </div>
                                <div class="validation-icon is-success">
                                    <V-IconWrap icon="feather:check" />
                                </div>
                                <div class="validation-icon is-error">
                                    <V-IconWrap icon="feather:x" />
                                </div>
                            </div>
                            <div class="button-wrap">
                                <V-Button color="white" size="big" lower rounded @click="step = 'login'">
                                    Cancelar
                                </V-Button>
                                <V-Button
                                    color="primary"
                                    size="big"
                                    type="submit"
                                    lower
                                    rounded
                                    solid
                                    @click="step = 'login'"
                                >
                                    Confirmar
                                </V-Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../scss/abstracts/_variables.scss";
@import "../../scss/abstracts/_mixins.scss";

.modern-login {
    position: relative;
    background: $white;
    min-height: 100vh;

    .column {
        &.is-relative {
            position: relative;
        }
    }

    .hero {
        &.has-background-image {
            position: relative;

            .hero-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #5d4298 !important;
                opacity: 0.6;
            }
        }
    }

    .underlay {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 66.6%;
        height: 100%;
        background: lighten(#fafafa, 1%);
        z-index: 0;
    }

    .dark-mode {
        position: absolute;
        top: -64px;
        right: 38px;
        transform: scale(0.6);
        z-index: 2;
    }

    .top-logo {
        position: absolute;
        top: -70px;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

        img {
            display: block;
            width: 100%;
            max-width: 50px;
            margin: 0 auto;
        }

        svg {
            height: 50px;
            width: 50px;
        }
    }

    .is-image {
        position: relative;
        border-right: 1px solid $fade-grey;

        .hero-image {
            position: relative;
            z-index: 2;
            display: block;
            margin: -80px auto 0 auto;
            max-width: 60%;
            width: 60%;
        }
    }

    .is-form {
        position: relative;
        max-width: 420px;
        margin: 0 auto;

        .form-class {
            animation: fadeInLeft 0.5s;
        }

        .form-text {
            padding: 0 20px;
            animation: fadeInLeft 0.5s;

            h2 {
                font-family: $font-alt;
                font-weight: 400;
                font-size: 2rem;
                color: $primary;
            }

            p {
                color: $muted-grey;
                margin-top: 10px;
            }
        }

        .recover-text {
            font-size: 0.9rem;
            color: $dark-text;
        }

        .login-wrapper {
            padding: 30px 20px;

            .control {
                position: relative;
                width: 100%;
                margin-top: 16px;

                .input {
                    padding-top: 14px;
                    height: 60px;
                    border-radius: 10px;
                    padding-left: 55px;
                    transition: all 0.3s;

                    &:focus {
                        background: lighten($fade-grey, 6%);
                        border-color: $placeholder;

                        ~ .auth-label,
                        ~ .autv-icon i {
                            color: $muted-grey;
                        }
                    }
                }

                .error-text {
                    color: $danger;
                    font-size: 0.8rem;
                    display: none;
                    padding: 2px 6px;
                }

                .auth-label {
                    position: absolute;
                    top: 6px;
                    left: 55px;
                    font-size: 0.8rem;
                    color: $dark-text;
                    font-weight: 500;
                    z-index: 2;
                    transition: all 0.3s;
                }

                .autv-icon {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 60px;
                    width: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    i {
                        font-size: 24px;
                        color: $placeholder;
                        transition: all 0.3s;
                    }
                }

                &.has-validation {
                    .validation-icon {
                        position: absolute;
                        top: 0;
                        right: 0;
                        height: 60px;
                        width: 60px;
                        display: none;
                        justify-content: center;
                        align-items: center;

                        .icon-wrapper {
                            height: 20px;
                            width: 20px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: $radius-rounded;

                            svg {
                                height: 10px;
                                width: 10px;
                                stroke-width: 3px;
                                color: $white;
                            }
                        }

                        &.is-success {
                            .icon-wrapper {
                                background: $success;
                            }
                        }

                        &.is-error {
                            .icon-wrapper {
                                background: $danger;
                            }
                        }
                    }

                    &.has-success {
                        .validation-icon {
                            &.is-success {
                                display: flex;
                            }

                            &.is-error {
                                display: none;
                            }
                        }
                    }

                    &.has-error {
                        .input {
                            border-color: $danger;
                        }

                        .error-text {
                            display: block;
                        }

                        .validation-icon {
                            &.is-error {
                                display: flex;
                            }

                            &.is-success {
                                display: none;
                            }
                        }
                    }
                }

                &.is-flex {
                    display: flex;
                    align-items: center;

                    a {
                        display: block;
                        margin-left: auto;
                        color: $muted-grey;
                        font-weight: 500;
                        font-size: 0.9rem;
                        transition: color 0.3s;

                        &:hover {
                            color: $primary;
                        }
                    }

                    .remember-me {
                        font-size: 0.9rem;
                        color: $muted-grey;
                        font-weight: 500;
                    }
                }
            }

            .button-wrap {
                margin: 40px 0;

                &.has-help {
                    display: flex;
                    align-items: center;

                    > span {
                        margin-left: 12px;
                        font-family: $font;

                        a {
                            color: $primary;
                            font-weight: 500;
                            padding: 0 2px;
                        }
                    }
                }

                .button {
                    height: 46px;
                    width: 140px;
                    margin-left: 6px;

                    &:first-child {
                        &:hover {
                            opacity: 0.8;
                        }
                    }
                }
            }
        }
    }
}

.remember-toggle {
    width: 65px;
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transform: scale(0.9);

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;

        &:checked ~ .toggler {
            border-color: $primary;

            .active,
            .inactive {
                transform: translateX(100%) rotate(360deg);
            }

            .active {
                opacity: 1;
            }

            .inactive {
                opacity: 0;
            }
        }
    }

    .toggler {
        position: relative;
        display: block;
        height: 34px;
        width: 61px;
        border: 2px solid $placeholder;
        border-radius: 100px;
        transition: all 0.3s;

        .active,
        .inactive {
            position: absolute;
            top: 2px;
            left: 2px;
            height: 26px;
            width: 26px;
            border-radius: $radius-rounded;
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: translateX(0) rotate(0);
            transition: all 0.3s ease;

            svg {
                color: $white;
                height: 14px;
                width: 14px;
                stroke-width: 3px;
            }
        }

        .inactive {
            background: $placeholder;
            border-color: $placeholder;
            opacity: 1;
            z-index: 1;
        }

        .active {
            background: $primary;
            border-color: $primary;
            opacity: 0;
            z-index: 0;
        }
    }
}

@media only screen and (max-width: 767px) {
    .modern-login {
        .top-logo {
            top: 30px;
        }

        .dark-mode {
            top: 36px;
            right: 44px;
        }

        .is-form {
            padding-top: 100px;
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .modern-login {
        .top-logo {
            svg {
                height: 60px;
                width: 60px;
            }
        }

        .dark-mode {
            top: -58px;
            right: 30%;
        }

        .columns {
            display: flex;
            height: 100vh;
        }
    }
}

/* ==========================================================================
Dark mode
========================================================================== */

.is-dark {
    .modern-login {
        background: $dark-sidebar;

        .underlay {
            background: lighten($dark-sidebar, 10%);
        }

        .is-image {
            border-color: lighten($dark-sidebar, 10%);
        }

        .is-form {
            .form-text {
                h2 {
                    color: $accent;
                }
            }

            .login-wrapper {
                .control {
                    &.is-flex {
                        a:hover {
                            color: $accent;
                        }
                    }

                    .input {
                        background: lighten($dark-sidebar, 4%);

                        &:focus {
                            border-color: $accent;

                            ~ .autv-icon {
                                i {
                                    color: $accent;
                                }
                            }
                        }
                    }

                    .auth-label {
                        color: $light-text;
                    }
                }

                .button-wrap {
                    &.has-help {
                        span {
                            color: $light-text;

                            a {
                                color: $accent;
                            }
                        }
                    }
                }
            }
        }
    }
    .remember-toggle {
        input {
            &:checked + .toggler {
                border-color: $accent;

                > span {
                    background: $accent;
                }
            }
        }

        .toggler {
            border-color: lighten($dark-sidebar, 12%);

            > span {
                background: lighten($dark-sidebar, 12%);
            }
        }
    }
}
</style>
<route lang="yaml">
meta:
    disableIfLoggedIn: true
</route>
