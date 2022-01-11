import axios from "axios"
import { computed } from "vue"
import store from "/@src/store"

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    headers: {
        "Content-type": "application/json",
    },
})

api.interceptors.request.use((config) => {
    const token = computed(() => store.getters.token.value)

    console.log(token.value)
    if (token.value) {
        config.headers.Authorization = `${token.value}`
    }

    return config
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (err) => {
        const uid = computed(() => store.getters.uid)
        const token = computed(() => store.getters.token)
        console.log("xx" + JSON.stringify(token.value))
        console.log("uid" + uid.value)

        // return other errors
        if (err.response.status !== 401) {
            return new Promise((resolve, reject) => {
                reject(err)
            })
        }
        // error on login
        if (err.response.config.url === "/auth/login") {
            return new Promise((resolve, reject) => {
                reject(err)
            })
        }
        // error on refresh
        if (err.response.config.url === "/auth/token") {
            store.commit("AUTH_LOGOUT")

            return new Promise((resolve, reject) => {
                reject(err)
            })
        }
        // refresh
        return api
            .post("/auth/token", {
                id: uid.value,
                token: token.value.refresh,
            })
            .then((success) => {
                console.log("success token updated")
                const config = err.response.config
                config.headers.Authorization = success.data.response.token
                store.commit("REFRESH_TOKEN", success.data.response)
                return api(config)
            })
    },
)

export { api }
