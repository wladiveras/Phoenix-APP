import { api } from "/@src/composable/useApi"
import { useStorage } from "@vueuse/core"

const state = {
    user: {},
    token: {
        key: "",
        value: "",
        refresh: "",
    },
    isLoggedIn: false,
}

const mutations = {
    AUTH_LOGIN(state, payload) {
        state.user = payload.response.user
        state.token.key = payload.response.key
        state.token.value = payload.response.token
        state.token.refresh = payload.response.refreshToken
    },
    AUTH_LOGOUT: (state) => {
        state.user = {}
        state.token.key = ""
        state.token.value = ""
        state.token.refresh = ""
    },
    REFRESH_TOKEN(state, payload) {
        state.token.key = payload.key
        state.token.value = payload.token
        state.token.refresh = payload.refreshToken
    },
}

const actions = {
    login({ state, commit }, user) {
        return new Promise((resolve, reject) => {
            api.post("auth/login", {
                email: user.data.email,
                password: user.data.password,
            })
                .then((response) => {
                    commit("AUTH_LOGIN", response.data)
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit("AUTH_LOGOUT")
            resolve(true)
        })
    },
    testAccess({ state, commit }) {
        api.get("users/61cb760ee2c5affee39d15c8").then((response) => {
            console.log("success")
        })
    },
}

const getters = {
    uid: (state) => state.user.id,
    user: (state) => state.user,
    isLoggedIn: (state) => !!state.token.value,
    token: (state) => state.token,
}

const sessionModule = {
    state,
    mutations,
    actions,
    getters,
}

export default sessionModule
