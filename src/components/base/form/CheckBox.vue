<script lang="ts">
import { useField } from "vee-validate"

export default {
    props: {
        modelValue: {
            type: null,
            default: null,
        },
        value: {
            type: null,
            default: null,
        },
        name: {
            type: String,
            default: "",
        },
        rules: {
            type: String,
            default: undefined,
        },
    },
    setup(props) {
        const { checked, handleChange } = useField(props.name, props.rules, {
            // 👇 These are important
            type: "checkbox",
            checkedValue: props.value,
        })

        // select/unselect the input
        handleChange(props.value)

        return {
            checked, // readonly
            uncheckedValue: false,
            handleChange,
        }
    },
}
</script>
<template>
    <button type="button" @click="handleChange(value)">
        {{ checked ? value : "🙅‍♂️" }} {{ checked ? "checked" : "unchecked" }}
    </button>
</template>
