import axios from "axios"

const state = {
    uid: "uidu3245828",
    user: {},
    permissions: [],
}

const mutations = {
    UPDATE_UID(state, payload) {
        state.uid = payload
    },
    UPDATE_USER(state, payload) {
        state.user = payload
    },
}

const actions = {
    getProductItems({ commit }) {
        axios.post(`/api/products`, {}).then((response) => {
            commit("UPDATE_PRODUCT_ITEMS", response.data)
        })
    },
}

const getters = {
    getId: (state) => state.uid,
    getUser: (state) => state.productItems,
    getUserById: (state) => (id) => {
        return state.productItems.find((productItem) => productItem.id === id)
    },
}

const userModule = {
    state,
    mutations,
    actions,
    getters,
}

export default userModule
