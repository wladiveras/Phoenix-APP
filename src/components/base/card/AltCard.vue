<script setup lang="ts">
import { ref, defineProps, toRefs, reactive } from "vue"

const name = ref("")

const props = defineProps({
    frontData: {
        type: Object,
        default: () => ({}),
    },
    frontModel: {
        type: Object,
        default: () => ({}),
    },
    backData: {
        type: Object,
        default: () => ({}),
    },
    backModel: {
        type: Object,
        default: () => ({}),
    },
    caption: {
        type: String,
        default: null,
    },
})

const front = ref(props.frontData)
const back = ref(props.backData)
</script>

<template>
    <!-- flip-card-container -->
    <div class="flip-card-container">
        <div class="flip-card">
            <div class="card-front box-shadow">
                <figure>
                    <img :src="front.background.value" />
                    <figcaption v-if="caption">{{ caption }}</figcaption>
                </figure>

                <ul>
                    <li v-for="(V, K) in frontModel.data" :key="K" :class="V.center ? 'card-center' : 'card-data'">
                        <!-- Image Values -->
                        <img
                            v-if="front[K].type === 'image'"
                            :class="[V.center ? 'card-center' : 'card-data', frontModel.rotate ? 'rotate' : null]"
                            :style="V.style"
                            class="avatar"
                            :src="front[K].value"
                        />
                        <!-- Text Values -->
                        <span
                            v-if="front[K].type === 'text'"
                            :class="[V.center ? 'card-center' : 'card-data', frontModel.rotate ? 'rotate' : null]"
                            :style="V.style"
                            class="card-text"
                        >
                            {{ front[K].value }}
                        </span>
                    </li>
                </ul>
            </div>

            <div class="card-back box-shadow">
                <figure>
                    <img :src="back.background.value" />
                    <figcaption v-if="caption">{{ caption }}</figcaption>
                </figure>

                <ul>
                    <li v-for="(V, K) in backModel.data" :key="K" :class="V.center ? 'card-center' : 'card-data'">
                        <!-- Image Values -->
                        <img
                            v-if="back[K].type === 'image'"
                            :class="[V.center ? 'card-center' : 'card-data', backModel.rotate ? 'rotate' : null]"
                            :style="V.style"
                            class="avatar"
                            :src="back[K].value"
                        />
                        <!-- Text Values -->
                        <span
                            v-if="back[K].type === 'text'"
                            :class="[V.center ? 'card-center' : 'card-data', backModel.rotate ? 'rotate' : null]"
                            :style="V.style"
                            class="card-text"
                        >
                            {{ back[K].value }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- /flip-card-container -->
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato");

*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.box-shadow {
    -webkit-box-shadow: 1px 4px 12px -3px rgba(0, 0, 0, 0.77);
    box-shadow: 1px 4px 12px -3px rgba(0, 0, 0, 0.77);
}
body {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.flip-card-container {
    --hue: 150;
    --primary: hsl(var(--hue), 50%, 50%);
    --white-1: hsl(0, 0%, 90%);
    --white-2: hsl(0, 0%, 80%);
    --dark: hsl(var(--hue), 25%, 10%);
    --grey: hsl(0, 0%, 50%);

    perspective: 1000px;
}

.flip-card {
    width: inherit;
    height: inherit;
    width: 237.66px;
    height: 378.39px;
    position: relative;
    transform-style: preserve-3d;
    transition: 0.6s 0.1s;
    display: block;
    margin: 0 auto;
}

.flip-card-container:hover .flip-card,
.flip-card-container:focus-within .flip-card {
    transform: rotateY(180deg);
}
.card-front,
.card-back {
    width: 100%;
    height: 100%;
    border-radius: 10px;

    background: var(--dark);
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

    backface-visibility: hidden;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

/* .card-front */
.card-front {
    transform: rotateY(0deg);
    z-index: 2;
}

/* .card-back */
.card-back {
    transform: rotateY(180deg);
    z-index: 1;
}
.card-center {
    position: relative;
    text-align: center;
    margin: 0 auto;
}

.card-center:nth-child(3n) {
    page-break-after: always; /* CSS 2.1 syntax */
    break-after: always; /* New syntax */
}

.card-data {
    position: absolute;
    padding: 0;
    margin: 0;
}
.rotate {
    display: block;
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
}
.rotate-bg {
    -webkit-transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
}

.avatar {
    display: block;
    width: 100%;
    height: 100%;
}

ul {
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: space-between;
}

/* figure */
figure {
    z-index: -1;
}
front-data {
    position: absolute;
}
/* figure, .img-bg */
figure,
.img-bg {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
}

/* img */
img {
    height: 100%;
    border-radius: 10px;
}

/* figcaption */
figcaption {
    display: block;

    width: auto;
    margin-top: 12%;
    padding: 8px 22px;

    font-weight: bold;
    line-height: 1.6;
    letter-spacing: 2px;
    word-spacing: 6px;
    text-align: right;

    position: absolute;
    top: 0;
    right: 0px;

    color: var(--white-1);
    background: hsla(var(--hue), 25%, 10%, 0.5);
}

/* hover state */
.flip-card-container:hover .card-front .img-bg::before {
    width: 6px;
    border-left-color: var(--primary);
    border-right-color: var(--primary);
}
</style>
