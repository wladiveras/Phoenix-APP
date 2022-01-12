<script setup lang="ts">
const props = defineProps({
    rows: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <div>
        <div v-for="row in props.rows" :key="row.id" class="flex-table-item">
            <div class="flex-table-cell is-bold is-fixed" data-th="Pedido">
                <span class="dark-text font-table">#{{ row.id }}</span>
            </div>
            <div class="flex-table-cell" data-th=""></div>
            <div class="flex-table-cell" data-th="Status">
                <span
                    class="tag is-rounded"
                    :class="[
                        row.status === 0 && 'is-primary',
                        row.status === 1 && 'is-warning',
                        row.status === 2 && 'is-info',
                        row.status === 3 && 'is-success',
                        row.status === 4 && 'is-danger',
                        row.status === 5 && 'is-danger',
                    ]"
                >
                    <span v-tooltip.primary="'Aguardando o preenchimento dos dados'" v-if="row.status === 0">
                        <i class="iconify" data-icon="feather:loader" aria-hidden="true"></i> Aguardando
                    </span>
                    <span v-tooltip.warning="'Seu pedido está sendo confeccionado'" v-if="row.status === 1">
                        <i class="iconify" data-icon="feather:archive" aria-hidden="true"></i> Em Produção
                    </span>
                    <span v-tooltip.info="'Seu pedido está a caminho, fique atento'" v-if="row.status === 2">
                        <i class="iconify" data-icon="feather:truck" aria-hidden="true"></i> A Caminho
                    </span>
                    <span
                        v-tooltip.success="'Pedido finalizado, seu pedido foi entregue no dia 07/05/2021'"
                        v-if="row.status === 3"
                    >
                        <i class="iconify" data-icon="feather:check" aria-hidden="true"></i> Entregue
                    </span>
                    <span v-tooltip.error="'Esse pedido foi cancelado'" v-if="row.status === 4">
                        <i class="iconify" data-icon="feather:x-octagon" aria-hidden="true"></i> Cancelado
                    </span>
                    <span v-tooltip.error="row.report" v-if="row.status === 5"
                        ><i class="iconify" data-icon="feather:alert-circle" aria-hidden="true"></i> Pausado
                    </span>
                </span>
            </div>
            <div class="flex-table-cell" data-th="Progresso">
                <VProgress v-if="row.status === 0" size="smaller" color="primary" />
                <VProgress v-if="row.status === 1" size="smaller" color="warning" :value="30" />
                <VProgress v-if="row.status === 2" size="smaller" color="info" :value="60" />
                <VProgress v-if="row.status === 3" size="smaller" color="success" :value="100" />
                <VProgress v-if="row.status === 4" size="smaller" color="danger" :value="100" />
                <VProgress v-if="row.status === 5" size="smaller" color="danger" />
            </div>

            <div class="flex-table-cell cell-end" data-th="Ações">
                <FlexTableDropdown />
            </div>
        </div>
    </div>
</template>

<style scoped>
.font-table {
    font-size: 1.5rem !important;
}
</style>
