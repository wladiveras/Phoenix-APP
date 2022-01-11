<script lang="ts">
// @ts-nocheck
import { useField } from "vee-validate"

export default {
    props: {
        name: String,
        title: String,
        label: String,
        value: Boolean,
    },
    setup(props, ctx) {
        const EMPTY_STRING = ""
        const { checked, handleChange, errorMessage, meta } = useField(props.name, undefined, {
            validateOnMount: false,
            uncheckedValue: EMPTY_STRING,
            type: "radio",
            valueProp: props.value,
        })

        const onChange = (event) => {
            let val = true

            if (!event.target.checked) {
                val = false
            }

            // val = !Number.isNaN(val) ? (Number.isInteger(val) ? parseInt(val) : parseFloat(val)) : '';

            handleChange(val)
            ctx.emit("update:modelValue", val)
        }

        return {
            checked,
            onChange,
            errorMessage,
            meta,
        }
    },
}
</script>

<template>
    <div class="tool-card">
        <input :id="name" type="checkbox" :name="name" :value="value" @change="onChange" />

        <div class="tool-card-inner">
            <V-Block :title="title" :subtitle="label" center>
                <template #action>
                    <div class="checkmark">
                        <i aria-hidden="true" class="iconify" data-icon="feather:check"></i>
                    </div>
                </template>
            </V-Block>
        </div>
    </div>
</template>
<style lang="scss">
@import "../../../scss/abstracts/_variables.scss";
@import "../../../scss/abstracts/_mixins.scss";
@import "../../../scss/pages/generic/_forms.scss";

/* ==========================================================================
1. Confirm Account
========================================================================== */

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

.is-dark {
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
</style>
