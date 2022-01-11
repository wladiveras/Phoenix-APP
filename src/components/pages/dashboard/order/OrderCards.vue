<script setup lang="ts">
const props = defineProps({
    cardsData: {
        type: Object,
        default: () => ({}),
    },
    frontModel: {
        type: Object,
        default: () => ({}),
    },
    backModel: {
        type: Object,
        default: () => ({}),
    },
})
</script>

<template>
    <div class="column is-12" style="display: flex; flex-wrap: wrap">
        <div v-for="(V, K) in cardsData" :key="K" style="margin: 10px">
            <AltCard
                caption="Alternativa"
                class="small"
                :front-data="V.front"
                :back-data="V.back"
                :front-model="frontModel"
                :back-model="backModel"
            >
            </AltCard>
        </div>
    </div>
</template>
