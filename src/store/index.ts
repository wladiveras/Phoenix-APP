import { createStore } from "vuex"
import VuexPersist from "vuex-persist"

import sessionModule from "./modules/session"
import userModule from "./modules/user"

const vuexPersist = new VuexPersist({
    key: <string>import.meta.env.VITE_APP_CODE_NAME || "app-name",
    storage: window.localStorage,
})

const store = createStore({
    plugins: [vuexPersist.plugin],
    modules: {
        session: sessionModule,
        user: userModule,
    },
})

export default store
