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
        <label :for="name">{{ label }}</label>
        <V-Control :icon="icon">
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
        <p
            v-show="errorMessage || meta.valid"
            class="help"
            :class="{ 'is-danger': !!errorMessage, success: meta.valid }"
        >
            {{ errorMessage || successMessage }}
        </p>
    </V-Field>
</template>
