<script lang="ts">
import "dragula/dist/dragula.css"
</script>

<script setup lang="ts">
import { computed, onMounted, ref, reactive } from "vue"
import dragula from "dragula"

import { tasks } from "/@src/data/apps/kanban"

const newContainer = ref<HTMLElement | null>(null)
const progressContainer = ref<HTMLElement | null>(null)
const productionContainer = ref<HTMLElement | null>(null)
const shippingContainer = ref<HTMLElement | null>(null)
const completedContainer = ref<HTMLElement | null>(null)

const search = ref("")
const isColumnNewCollapsed = ref(false)
const isColumnProgressCollapsed = ref(false)
const isColumnProductionCollapsed = ref(false)
const isColumnShippingCollapsed = ref(false)
const isColumnCompletedCollapsed = ref(false)

const filteredOrders = computed(() => {
    if (!search.value) {
        return tasks
    } else {
        return tasks.filter((item) => {
            return item.title.match(new RegExp(search.value, "i"))
        })
    }
})

const participants = computed(() => {
    return tasks.reduce<{ picture: string; color?: string }[]>((accumulator, task) => {
        for (const participant of task.participants) {
            const exists = accumulator.find((value) => {
                return value.picture === participant.picture
            })

            if (!exists) {
                accumulator.push(participant)
            }
        }

        return accumulator
    }, [])
})

const newOrders = computed(() => {
    return filteredOrders.value.filter((task) => task.state === "new")
})
const progressOrders = computed(() => {
    return filteredOrders.value.filter((task) => task.state === "progress")
})
const productionOrders = computed(() => {
    return filteredOrders.value.filter((task) => task.state === "production")
})
const shippingOrders = computed(() => {
    return filteredOrders.value.filter((task) => task.state === "shipping")
})
const completedOrders = computed(() => {
    return filteredOrders.value.filter((task) => task.state === "completed")
})

onMounted(() => {
    if (
        newContainer.value &&
        progressContainer.value &&
        productionContainer.value &&
        shippingContainer.value &&
        completedContainer.value
    ) {
        const drake = dragula(
            [
                newContainer.value,
                progressContainer.value,
                productionContainer.value,
                shippingContainer.value,
                completedContainer.value,
            ],
            {
                invalid: (el) => {
                    const _el = el as HTMLElement

                    if (_el) {
                        if (_el.classList.contains("kanban-card")) {
                            const id = _el.dataset.id

                            if (id) {
                                const task = tasks.find((task) => {
                                    return task.id === id
                                })

                                if (task) {
                                    return task.state === "completed" || task.state === "new"
                                }
                            }
                        }

                        return _el.classList.contains("kanban-empty")
                    }

                    return true
                },
            },
        )

        drake.on("drop", (el, target) => {
            const _target = target as HTMLElement
            const _el = el as HTMLElement

            if (_el && _target) {
                const id = _el.dataset.id
                const state = _target.dataset.state

                if (id && state) {
                    const task = tasks.find((task) => {
                        return task.id === id
                    })

                    if (task) {
                        task.state = state
                    }
                }
            }
        })
    }
})
</script>

<template>
    <div class="page-content kanban-content is-relative">
        <div class="kanban-toolbar">
            <V-Control icon="feather:search">
                <input v-model="search" class="input" placeholder="Buscar..." />
            </V-Control>

            <V-AvatarStack :avatars="participants" size="small" />

            <V-Button color="primary" raised bold> New Task </V-Button>
        </div>

        <div class="columns is-kanban-wrapper">
            <!-- Column container -->
            <div
                class="column"
                :class="[isColumnNewCollapsed && 'is-1 is-mini', !isColumnNewCollapsed && 'is-one-fifth']"
            >
                <!-- Kanban column -->
                <div
                    class="kanban-column"
                    :class="[isColumnNewCollapsed && 'is-collapsed', newOrders.length === 0 && 'is-empty']"
                >
                    <!-- Collapsed content -->
                    <div class="collapsed-content">
                        <div class="expand-button" @click="isColumnNewCollapsed = false">
                            <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
                        </div>
                        <div>
                            <span class="task-count">{{ newOrders.length }}</span>
                        </div>
                        <div class="collapsed-text">Novas Proposta</div>
                    </div>
                    <!-- Expanded content -->
                    <div class="expanded-content">
                        <div class="column-title">
                            <input type="text" class="input is-small rename-input is-hidden" />
                            <h3>
                                <span class="column-name">Nova Proposta</span>
                                <span class="task-count">{{ newOrders.length }}</span>
                            </h3>
                            <KanbanDropdown @collapse="isColumnNewCollapsed = true" />
                        </div>

                        <div ref="newContainer" data-state="new">
                            <!-- Empty state image / text -->
                            <div v-if="newOrders.length === 0" class="kanban-empty">
                                <img
                                    class="empty-state theme-image light-image"
                                    src="/@src/assets/illustrations/projects/board/new.svg"
                                    alt=""
                                />
                                <img
                                    class="empty-state theme-image dark-image"
                                    src="/@src/assets/illustrations/projects/board/new-dark.svg"
                                    alt=""
                                />
                                <p class="empty-text">Nenhuma nova proposta no momento.</p>
                            </div>

                            <div v-for="task in newOrders" :key="task.id" :data-id="task.id" class="kanban-card is-new">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        {{ task.title }}
                                    </h4>
                                    <div class="new-avatar">
                                        <div
                                            class="avatar-wrapper"
                                            :class="[task.participants[0].color && `is-${task.participants[0].color}`]"
                                        >
                                            <img
                                                class="task-owner"
                                                :src="task.participants[0].picture"
                                                alt=""
                                                @error.once="
                                                    // @ts-ignore
                                                    $event.target.src = 'https://via.placeholder.com/62x62'
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>

                                <footer class="card-footer">
                                    <RouterLink to="/commercial/invoice/6549" class="card-footer-item">
                                        Visualizar
                                    </RouterLink>
                                    <a class="card-footer-item" @click="task.state = 'progress'"> Aprovar </a>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="column"
                :class="[isColumnProgressCollapsed && 'is-1 is-mini', !isColumnProgressCollapsed && 'is-one-fifth']"
            >
                <div
                    class="kanban-column can-drag"
                    :class="[isColumnProgressCollapsed && 'is-collapsed', progressOrders.length === 0 && 'is-empty']"
                >
                    <!-- Collapsed content -->
                    <div class="collapsed-content">
                        <div class="expand-button" @click="isColumnProgressCollapsed = false">
                            <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
                        </div>
                        <div>
                            <span class="task-count">{{ progressOrders.length }}</span>
                        </div>
                        <div class="collapsed-text">Em Progresso</div>
                    </div>
                    <!-- Expanded content -->
                    <div class="expanded-content">
                        <div class="column-title">
                            <input type="text" class="input is-small rename-input is-hidden" />
                            <h3>
                                <span class="column-name">Em Progresso</span>
                                <span class="task-count">{{ progressOrders.length }}</span>
                            </h3>
                            <KanbanDropdown @collapse="isColumnProgressCollapsed = true" />
                        </div>

                        <div ref="progressContainer" data-state="progress">
                            <!-- Empty state image / text -->
                            <div v-if="progressOrders.length === 0" class="kanban-empty">
                                <img
                                    class="empty-state theme-image light-image-block"
                                    src="/@src/assets/illustrations/projects/board/progress.svg"
                                    alt=""
                                />
                                <img
                                    class="empty-state theme-image dark-image-block"
                                    src="/@src/assets/illustrations/projects/board/progress-dark.svg"
                                    alt=""
                                />
                                <p class="empty-text">No momento, não há nenhum pedido em andamento.</p>
                            </div>

                            <div
                                v-for="order in progressOrders"
                                :key="order.id"
                                :data-id="order.id"
                                class="kanban-card is-new"
                            >
                                <div class="card-body">
                                    <h4 class="card-title">
                                        {{ order.title }}
                                    </h4>
                                    <div class="new-avatar">
                                        <div
                                            class="avatar-wrapper"
                                            :class="[
                                                order.participants[0].color && `is-${order.participants[0].color}`,
                                            ]"
                                        >
                                            <img
                                                class="task-owner"
                                                :src="order.participants[0].picture"
                                                alt=""
                                                @error.once="
                                                    // @ts-ignore
                                                    $event.target.src = 'https://via.placeholder.com/62x62'
                                                "
                                            />
                                        </div>
                                    </div>
                                </div>

                                <footer class="card-footer">
                                    <RouterLink to="/commercial/invoice/6549" class="card-footer-item">
                                        Visualizar
                                    </RouterLink>
                                    <a class="card-footer-item" @click="order.state = 'production'"> Aprovar </a>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="column"
                :class="[isColumnProductionCollapsed && 'is-1 is-mini', !isColumnProductionCollapsed && 'is-one-fifth']"
            >
                <div
                    class="kanban-column can-drag"
                    :class="[
                        isColumnProductionCollapsed && 'is-collapsed',
                        productionOrders.length === 0 && 'is-empty',
                    ]"
                >
                    <!-- Collapsed content -->
                    <div class="collapsed-content">
                        <div class="expand-button" @click="isColumnProductionCollapsed = false">
                            <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
                        </div>
                        <div>
                            <span class="task-count">{{ productionOrders.length }}</span>
                        </div>
                        <div class="collapsed-text">Em Produção</div>
                    </div>
                    <!-- Expanded content -->
                    <div class="expanded-content">
                        <div class="column-title">
                            <input type="text" class="input is-small rename-input is-hidden" />
                            <h3>
                                <span class="column-name">Em Produção</span>
                                <span class="task-count">{{ productionOrders.length }}</span>
                            </h3>
                            <KanbanDropdown @collapse="isColumnProductionCollapsed = true" />
                        </div>

                        <div ref="productionContainer" data-state="ready">
                            <div v-if="productionOrders.length === 0" class="kanban-empty">
                                <!-- Empty state image / text -->
                                <img
                                    class="empty-state theme-image light-image-block"
                                    src="/@src/assets/illustrations/projects/board/ready.svg"
                                    alt=""
                                />
                                <img
                                    class="empty-state theme-image dark-image-block"
                                    src="/@src/assets/illustrations/projects/board/ready-dark.svg"
                                    alt=""
                                />
                                <p class="empty-text">
                                    <span>Nenhum pedido em produção no momento.</span>
                                    <a href="#" class="button v-button is-outlined is-rounded is-fullwidth">
                                        Create Task
                                    </a>
                                </p>
                            </div>

                            <div
                                v-for="task in productionOrders"
                                :key="task.id"
                                :data-id="task.id"
                                class="kanban-card gelatine"
                            >
                                <div class="card-body">
                                    <h4 class="card-title">{{ task.title }}</h4>
                                    <div class="kanban-card-stats">
                                        <span>
                                            <i aria-hidden="true" class="iconify" data-icon="feather:clock"></i>
                                            {{ task.dueDate }}
                                        </span>

                                        <V-AvatarStack size="small" :avatars="task.participants" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="column"
                :class="[isColumnShippingCollapsed && 'is-1 is-mini', !isColumnShippingCollapsed && 'is-one-fifth']"
            >
                <div
                    class="kanban-column can-drag"
                    :class="[isColumnShippingCollapsed && 'is-collapsed', shippingOrders.length === 0 && 'is-empty']"
                >
                    <!-- Collapsed content -->
                    <div class="collapsed-content">
                        <div class="expand-button" @click="isColumnShippingCollapsed = false">
                            <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
                        </div>
                        <div>
                            <span class="task-count"> {{ shippingOrders.length }}</span>
                        </div>
                        <div class="collapsed-text">A caminho</div>
                    </div>
                    <!-- Expanded content -->
                    <div class="expanded-content">
                        <div class="column-title">
                            <input type="text" class="input is-small rename-input is-hidden" />
                            <h3>
                                <span class="column-name">A caminho</span>
                                <span class="task-count">{{ shippingOrders.length }}</span>
                            </h3>
                            <KanbanDropdown @collapse="isColumnShippingCollapsed = true" />
                        </div>

                        <div ref="shippingContainer" data-state="review">
                            <div v-if="shippingOrders.length === 0" class="kanban-empty">
                                <!-- Empty state image / text -->
                                <img
                                    class="empty-state theme-image light-image-block"
                                    src="/@src/assets/illustrations/projects/board/test.svg"
                                    alt=""
                                />
                                <img
                                    class="empty-state theme-image dark-image-block"
                                    src="/@src/assets/illustrations/projects/board/test-dark.svg"
                                    alt=""
                                />
                                <p class="empty-text">Não nenhum pedido nos correios no momento.</p>
                            </div>

                            <div
                                v-for="task in shippingOrders"
                                :key="task.id"
                                :data-id="task.id"
                                class="kanban-card gelatine"
                            >
                                <div class="card-body">
                                    <h4 class="card-title">{{ task.title }}</h4>
                                    <div class="kanban-card-stats">
                                        <span>
                                            <i aria-hidden="true" class="iconify" data-icon="feather:clock"></i>
                                            {{ task.dueDate }}
                                        </span>

                                        <V-AvatarStack size="small" :avatars="task.participants" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="column"
                :class="[isColumnCompletedCollapsed && 'is-1 is-mini', !isColumnCompletedCollapsed && 'is-one-fifth']"
            >
                <div
                    class="kanban-column"
                    :class="[isColumnCompletedCollapsed && 'is-collapsed', completedOrders.length === 0 && 'is-empty']"
                >
                    <!-- Collapsed content -->
                    <div class="collapsed-content">
                        <div class="expand-button" @click="isColumnCompletedCollapsed = false">
                            <i aria-hidden="true" class="iconify" data-icon="feather:plus"></i>
                        </div>
                        <div>
                            <span class="task-count">{{ completedOrders.length }}</span>
                        </div>
                        <div class="collapsed-text">Concluido</div>
                    </div>
                    <!-- Expanded content -->
                    <div class="expanded-content">
                        <div class="column-title">
                            <input type="text" class="input is-small rename-input is-hidden" />
                            <h3>
                                <span class="column-name">Concluido</span>
                                <span class="task-count">{{ completedOrders.length }}</span>
                            </h3>
                            <KanbanDropdown @collapse="isColumnCompletedCollapsed = true" />
                        </div>

                        <div ref="completedContainer" data-state="completed">
                            <!-- Empty state image / text -->
                            <div v-if="completedOrders.length === 0" class="kanban-empty">
                                <img
                                    class="empty-state theme-image light-image-block"
                                    src="/@src/assets/illustrations/projects/board/complete.svg"
                                    alt=""
                                />
                                <img
                                    class="empty-state theme-image dark-image-block"
                                    src="/@src/assets/illustrations/projects/board/complete-dark.svg"
                                    alt=""
                                />
                                <p class="empty-text">Nenhum pedido concluido nessa semana.</p>
                            </div>

                            <div
                                v-for="task in completedOrders"
                                :key="task.id"
                                :data-id="task.id"
                                class="kanban-card gelatine"
                            >
                                <div class="card-body">
                                    <h4 class="card-title">{{ task.title }}</h4>
                                    <div class="kanban-card-stats">
                                        <span>
                                            <i aria-hidden="true" class="iconify" data-icon="feather:clock"></i>
                                            {{ task.dueDate }}
                                        </span>

                                        <V-AvatarStack size="small" :avatars="task.participants" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../../../../scss/abstracts/_variables.scss";

/*
    1. Kanban Toolbar
    2. Kanban Layout
    3. Kanban Card
    4. Dragula
    5. Kanban Board Dark mode
    6. Media Queries
*/

/* ==========================================================================
1. Kanban Toolbar
========================================================================== */

.kanban-toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &.is-navbar {
        padding-top: 30px;
    }

    .avatar-stack {
        margin-left: 16px;
    }

    .button {
        margin-left: auto;
    }
}

/* ==========================================================================
2. Kanban Layout
========================================================================== */

.is-kanban-wrapper {
    .column {
        padding: 0.35rem !important;
    }

    .kanban-column {
        padding: 6px;
        background: #e3e4e5;
        border-radius: 8px;
        border: 1px solid #ddd;

        .column-title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h3 {
                margin-bottom: 0;
                font-family: $font;
                font-size: 0.85rem;
                font-weight: 500;
                text-transform: uppercase;
                color: darken($light-text, 8%);
            }

            .input {
                margin-right: 20px;
            }

            svg {
                height: 18px;
                width: 18px;
                color: $dark-text;
            }

            .task-count {
                padding-left: 4px;

                &::before {
                    content: "(";
                }
                &::after {
                    content: ")";
                }
            }

            .dropdown {
                .is-trigger {
                    height: 18px;
                    width: 18px;
                    cursor: pointer;

                    svg {
                        height: 18px;
                        width: 18px;
                        color: darken($light-text, 8%);
                    }
                }
            }
        }

        .empty-state {
            margin: 30px auto 10px auto;
            width: 150px;
            height: auto;
        }

        .empty-text {
            text-align: center;
            padding: 10px 10px 20px 10px;
            font-size: 0.95rem;
            color: $dark-text;

            span {
                display: block;
            }

            a {
                line-height: 0.9;
                margin-top: 10px;
            }
        }

        .collapsed-content {
            display: none;
        }

        &.is-empty {
            .empty-state,
            .empty-text {
                display: block;
            }
        }

        &.is-collapsed {
            width: 100%;
            height: 500px;
            position: relative;

            .expanded-content {
                display: none;
            }

            .column-title,
            .kanban-card,
            .empty-state,
            .empty-text {
                display: none;
            }

            .collapsed-content {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                .expand-button {
                    margin-top: 20px;
                    height: 46px;
                    width: 46px;
                    background: $white;
                    border-radius: $radius-rounded;
                    border: 1.4px solid $fade-grey;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.3s;
                    cursor: pointer;

                    svg {
                        height: 18px;
                        width: 18px;
                        transition: all 0.3s;
                        color: $muted-grey;
                    }

                    &:hover {
                        border-color: $primary;

                        svg {
                            color: $primary;
                        }
                    }
                }

                .task-count {
                    margin-top: 20px;
                    height: 38px;
                    width: 38px;
                    background: $primary;
                    border-radius: $radius-rounded;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: $smoke-white;
                }

                .collapsed-text {
                    position: absolute;
                    bottom: 160px;
                    min-width: 250px;
                    font-size: 1rem;
                    color: $dark-text;
                    font-weight: 600;
                    margin-left: -3px;
                    transform: rotate(-90deg);
                }
            }
        }
    }
}

/* ==========================================================================
3. Kanban Card
========================================================================== */

.kanban-card {
    width: 100%;
    background: $white;
    border-radius: $radius-large;
    margin-top: 10px;
    border: 1px solid #ddd;
    transition: all 0.4s;

    &:hover {
        box-shadow: 0 5px 43px rgba(0, 0, 0, 0.18) !important;
    }

    &.is-new {
        .new-avatar {
            margin: 20px 0 10px 0;
            width: 100%;

            .avatar-wrapper {
                position: relative;
                width: 74px;
                height: 74px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
                border-radius: $radius-rounded;

                &::after {
                    content: "";
                    position: absolute;
                    top: calc(50% - 12px);
                    left: calc(50% - 12px);
                    height: 24px;
                    width: 24px;
                    border-radius: $radius-rounded;
                    background: $white;
                    animation: wave 1.6s infinite;
                    animation-duration: 2s;
                    transform-origin: center center;
                    z-index: 0;
                }

                .task-owner {
                    position: relative;
                    display: block;
                    width: 62px;
                    height: 62px;
                    border-radius: $radius-rounded;
                    z-index: 2;
                }

                &.is-warning {
                    border: 2px solid $warning;

                    &::after {
                        background: $warning;
                    }
                }

                &.is-primary {
                    border: 2px solid $primary;

                    &::after {
                        background: $primary;
                    }
                }

                &.is-success {
                    border: 2px solid $success;

                    &::after {
                        background: $success;
                    }
                }

                &.is-danger {
                    border: 2px solid $danger;

                    &::after {
                        background: $danger;
                    }
                }

                &.is-info {
                    border: 2px solid $info;

                    &::after {
                        background: $info;
                    }
                }
            }
        }

        .card-footer {
            a {
                font-size: 0.85rem;
                font-weight: 500;
                color: $light-text;
            }
        }
    }

    .card-body {
        padding: 10px;

        .kanban-card-stats {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 16px;

            > span {
                font-size: 0.9rem;
                color: $light-text;

                svg {
                    position: relative;
                    top: 2px;
                    height: 14px;
                    width: 14px;
                    stroke-width: 1.6px;
                }
            }
        }
    }

    .card-title {
        font-size: 0.9rem;
        font-family: $font-alt;
        font-weight: 600;
        color: $dark-text;
    }

    .spaced-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
}

/* ==========================================================================
4. Dragula
========================================================================== */

.can-drag {
    .kanban-card {
        //fallback if grab cursor is unsupported
        cursor: move;
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;

        //(Optional) Apply a "closed-hand" cursor during drag operation.
        &:active {
            cursor: grabbing;
            cursor: -moz-grabbing;
            cursor: -webkit-grabbing;
        }
    }
}

.gu-transit {
    cursor: grabbing !important;
    cursor: -moz-grabbing !important;
    cursor: -webkit-grabbing !important;
}

.gu-mirror {
    position: fixed;
}

/* ==========================================================================
5. Kanban Board Dark mode
========================================================================== */

.is-dark {
    .kanban-column {
        background: lighten($dark-sidebar, 15%);
        border-color: lighten($dark-sidebar, 15%);

        .collapsed-content {
            .expand-button {
                background: lighten($dark-sidebar, 6%) !important;
                border-color: lighten($dark-sidebar, 12%) !important;

                &:hover {
                    svg {
                        color: $accent !important;
                    }
                }
            }

            .task-count {
                background: $accent !important;
                border-color: $accent !important;

                svg {
                    color: $white !important;
                }
            }

            .collapsed-text {
                color: $dark-dark-text !important;
            }
        }

        .column-title {
            h3 {
                color: $light-white;
            }

            .is-trigger svg {
                color: $light-white !important;
            }
        }

        .dropdown-content {
            background: $dark-sidebar;

            .dropdown-item {
                color: $white;
            }

            .dropdown-divider {
                background: lighten($dark-sidebar, 5%);
            }

            a:hover,
            div:hover {
                background: lighten($dark-sidebar, 5%) !important;
            }
        }

        .empty-text {
            color: $accent-grey;
        }

        .kanban-card,
        .gu-transit {
            background: lighten($dark-sidebar, 6%) !important;
            border-color: lighten($dark-sidebar, 6%) !important;

            &.is-new {
                background: lighten($dark-sidebar, 6%);
                border-color: lighten($dark-sidebar, 6%);

                .card-title {
                    color: lighten($accent-grey, 2%);
                }

                .card-footer,
                .card-footer-item {
                    border-color: lighten($dark-sidebar, 20%);
                    color: $light-white;
                }
            }

            .card-title {
                color: lighten($accent-grey, 2%);
            }
        }
    }
}

/* ==========================================================================
6. Media Queries
========================================================================== */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
    .kanban-column {
        padding: 20px !important;

        .kanban-card {
            .card-body {
                padding: 20px 40px;
            }
        }
    }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    .kanban-content {
        padding: 0 10px !important;
    }

    .is-kanban-wrapper {
        .column {
            padding: 0.15rem !important;
        }
    }

    .kanban-column {
        .empty-state {
            width: 130px !important;
        }

        .empty-text {
            font-size: 0.7rem !important;
        }

        .kanban-card {
            .card-title {
                max-width: 152px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .bounty-meta {
                .due-date {
                    display: none;
                }
            }

            .progress-block {
                margin-top: 8px;

                .spec-count {
                    font-size: 0.5rem;
                }
            }

            .avatar-group img {
                height: 28px;
                width: 28px;
            }

            .done-icon {
                height: 18px;
                width: 18px;

                svg {
                    height: 12px;
                    width: 12px;
                }
            }

            &.is-invitation {
                .invitation-avatar {
                    .avatar-wrapper {
                        width: 58px;
                        height: 58px;

                        .bounty-owner {
                            width: 44px;
                            height: 44px;
                        }

                        .skill-badge {
                            width: 20px;
                            height: 20px;
                        }
                    }
                }

                .card-footer-item {
                    padding: 0.5rem;
                    font-size: 0.7rem;
                }

                .time-left {
                    .time-value {
                        font-size: 0.5rem;
                    }
                }
            }
        }
    }
}
</style>
