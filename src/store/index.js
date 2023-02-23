import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import tab from './tab'

Vue.use(Vuex)

// 创建Vuex实例
export default new Vuex.Store({
    modules: {
        tab
    },
    plugins: [createPersistedState()]   // 默认存储到Local Storage里
})
