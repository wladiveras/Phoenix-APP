import { api } from "/@src/composable/useApi"
import { ISession } from "/@src/@types/interfaces/sessionInterface"

const state = {
    user: {},
    token: {
        value: "",
        refresh: "",
    },
    isLoggedIn: false,
}

const mutations = {
    AUTH_LOGIN(state: ISession, payload: ISession) {
        state.user = payload.response.user
        state.token.value = payload.response.token
        state.token.refresh = payload.response.refreshToken
    },
    AUTH_LOGOUT: (state: ISession) => {
        state.user = {}
        state.token.value = ""
        state.token.refresh = ""
    },
    REFRESH_TOKEN(state: ISession, payload) {
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
                .then(response => {
                    commit("AUTH_LOGIN", response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    logout({ commit }) {
        return new Promise(resolve => {
            commit("AUTH_LOGOUT")
            resolve(true)
        })
    },
    testAccess({ state, commit }) {
        api.get("users/61cb760ee2c5affee39d15c8").then(response => {
            console.log("success")
        })
    },
}

const getters = {
    uid: state => state.user.id,
    user: state => state.user,
    isLoggedIn: state => !!state.token.value,
    token: state => state.token,
}

const sessionModule = {
    state,
    mutations,
    actions,
    getters,
}

export default sessionModule
