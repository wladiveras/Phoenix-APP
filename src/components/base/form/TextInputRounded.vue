<script lang="ts">
import { useField } from "vee-validate"

export default {
    props: {
        type: {
            type: String,
            default: "text",
        },
        value: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        successMessage: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        // we don't provide any rules here because we are using form-level validation
        // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
        const {
            value: inputValue,
            errorMessage,
            handleBlur,
            handleChange,
            meta,
        } = useField(props.name, undefined, {
            initialValue: props.value,
        })

        return {
            handleChange,
            handleBlur,
            errorMessage,
            inputValue,
            meta,
        }
    },
}
</script>
<template>
    <V-Field class="control has-validation" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
        <V-Control>
            <input
                :id="name"
                class="input"
                :name="name"
                :type="type"
                :value="inputValue"
                :placeholder="placeholder"
                :disabled="disabled"
                @input="handleChange"
                @blur="handleBlur"
            />
        </V-Control>
        <div class="auth-label" :for="name">{{ label }}</div>
        <div class="autv-icon">
            <i aria-hidden="true" class="iconify size-fix" :data-icon="icon"></i>
        </div>
        <p
            v-show="errorMessage || meta.valid"
            class="help"
            :class="{ 'is-danger': !!errorMessage, success: meta.valid }"
        >
            {{ errorMessage || successMessage }}
        </p>
    </V-Field>
</template>

<style lang="scss" scoped>
@import "../../../scss/abstracts/_variables.scss";
@import "../../../scss/abstracts/_mixins.scss";

.size-fix {
    color: #cecece;
    font-size: 1.5rem;
}
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

        form {
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
    .size-fix {
        color: #a2a5b9;
    }
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
