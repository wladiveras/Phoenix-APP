<script setup lang="ts">
import { computed, ref } from "vue"

const options = {
    placeholder: "Em Progresso",
    data: [
        { value: "production", label: "Em Produção" },
        { value: "progress", label: "Em Progresso" },

        { value: "shipping", label: "Em Transporte" },
        { value: "delay", label: "Em atraso" },
        { value: "finished", label: "Finalizado" },
    ],
}

const orders = [
    {
        id: 5564,
        priority: true,
        status: "delay",
        dueDate: "3 dias em atraso",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. , discessimus. Iam enim adesse poterit. Duo Reges: constructio interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
    {
        id: 7745,
        priority: false,
        status: "progress",
        dueDate: "5 dias restantes",
        description: "$ interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
    {
        id: 43,
        priority: false,
        status: "progress",
        dueDate: "5 dias restantes",
        description: "$ interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
    {
        id: 6546,
        priority: false,
        status: "progress",
        dueDate: "5 dias restantes",
        description: "$ interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
    {
        id: 980,
        priority: true,
        status: "progress",
        dueDate: "5 dias restantes",
        description: "$ interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
    {
        id: 756,
        priority: false,
        status: "production",
        dueDate: "5 dias restantes",
        description: "$ interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
    {
        id: 32432,
        priority: false,
        status: "delay",
        dueDate: "5 dias restantes",
        description: "$ interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
    {
        id: 324,
        priority: false,
        status: "finished",
        dueDate: "5 dias restantes",
        description: "$ interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
    {
        id: 643,
        priority: false,
        status: "shipping",
        dueDate: "5 dias restantes",
        description: "$ interrete.",
        user: {
            name: "XING LING LTDA",
            email: "cane@quejo.flango",
        },
    },
]

const filters = ref("")

const filteredData = computed(() => {
    if (!filters.value) {
        return orders
    } else {
        return orders.filter((item) => {
            return item.status.match(new RegExp(filters.value, "i"))
        })
    }
})

const priorityData = computed(() => {
    return orders.filter((item) => {
        return item.status.match(new RegExp("delay", "i")) || item.priority
    })
})
</script>

<template>
    <div class="all-projects">
        <div class="illustration-header">
            <img class="light-image" src="/@src/assets/illustrations/projects/header.svg" alt="" />
            <img class="dark-image" src="/@src/assets/illustrations/projects/header-dark.svg" alt="" />
            <div class="header-stats">
                <div class="stats-inner">
                    <div class="stat-item">
                        <span class="status is-warning">4</span>
                        <p><b>Em atraso</b></p>
                    </div>
                    <div class="stat-item">
                        <span class="is-info">89</span>
                        <p>Em Transporte</p>
                    </div>
                    <div class="stat-item">
                        <span class="is-success">3</span>
                        <p>Em Produção</p>
                    </div>
                    <div class="stat-item">
                        <span class="is-success">12</span>
                        <p>Em Progresso</p>
                    </div>

                    <div class="stat-item">
                        <span class="is-primary">141</span>
                        <p>Total de Pedidos</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="recent-projects">
            <h3 class="recent-heading">Fila de Prioridade</h3>

            <div class="tile-grid tile-grid-v1">
                <!--Tile Grid v1-->
                <transition-group name="list" tag="div" class="columns is-multiline">
                    <!--Grid item-->
                    <div v-for="(V, K) in priorityData" :key="K" class="column is-4">
                        <div class="tile-grid-item">
                            <div class="tile-grid-item-inner">
                                <V-Avatar picture="https://picsum.photos/id/1/200/200" color="primary" size="medium" />
                                <div class="meta">
                                    <span class="dark-inverted">{{ V.user.name }}</span>
                                    <span>{{ V.user.email }}</span>
                                </div>
                                <UserCardDropdown />
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>

        <div class="project-minimal-grid">
            <div class="grid-header">
                <h3>Pedidos</h3>
                <div class="filter">
                    <span>Listar por</span>

                    <V-Control>
                        <Multiselect v-model="filters" :options="options.data" :placeholder="options.placeholder" />
                    </V-Control>
                </div>
            </div>

            <div class="columns is-multiline grid-body">
                <div v-for="(V, K) in filteredData" :key="K" class="column is-4">
                    <RouterLink
                        :to="{
                            name: 'dashboard-order-detail',
                            params: { id: V.id },
                        }"
                        class="grid-item"
                    >
                        <div class="item-head">
                            <span class="type">#{{ V.id }}</span>
                            <span v-if="V.status == 'production'" class="status is-success"> Em Produção </span>
                            <span v-if="V.status == 'progress'" class="status is-success"> Em Progresso </span>
                            <span v-if="V.status == 'delay'" class="status is-warning"> Em Atraso </span>
                            <span v-if="V.status == 'shipping'" class="status is-info"> Em Transporte </span>
                            <span v-if="V.status == 'finished'" class="status is-danger"> Finalizado </span>
                        </div>
                        <div class="item-title">
                            <h3>{{ V.user.name }}</h3>
                            <div class="tags">
                                <V-Tag v-if="V.priority" label="Prioridade" color="primary" rounded />
                            </div>
                        </div>
                        <div class="item-description">
                            <p>
                                {{ V.description }}
                            </p>

                            <div class="item-people">
                                <span></span>
                                <span class="label">{{ V.dueDate }}</span>
                            </div>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../../scss/abstracts/_variables.scss";
@import "../../../../scss/abstracts/_mixins.scss";
@import "../../../../scss/pages/projects/_projects.scss";

@import "../../../../scss/pages/lists/_tile-grid-v1.scss";
</style>
