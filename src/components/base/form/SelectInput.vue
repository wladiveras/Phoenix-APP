<script lang="ts">
import { useField } from "vee-validate"

export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: "Selecionar...",
        },
        items: {
            type: Array,
            default: () => [],
        },
        value: {
            type: String,
            default: "",
        },
    },
    setup(props, ctx) {
        const {
            value: inputValue,
            handleChange,
            errorMessage,
        } = useField(props.name, undefined, {
            initialValue: props.value,
        })

        const onChange = (event) => {
            const value = event.target.value
            handleChange(value)
            ctx.emit("update:modelValue", value)
        }

        return {
            onChange,
            errorMessage,
            inputValue,
        }
    },
}
</script>
<template>
    <V-Field class="control has-validation" :class="{ 'has-error': !!errorMessage }">
        <label :for="name">{{ label }}</label>
        <V-Control :icon="icon">
            <div class="select">
                <select :name="name" @change="onChange">
                    <option value="" disabled selected>{{ placeholder }}</option>
                    <option v-for="(item, index) in items" :key="index" :value="item.value">
                        {{ item.text }}
                    </option>
                </select>
            </div>
        </V-Control>
        <p v-show="errorMessage" class="help" :class="{ 'is-danger': !!errorMessage }">
            {{ errorMessage || successMessage }}
        </p>
    </V-Field>
</template>
