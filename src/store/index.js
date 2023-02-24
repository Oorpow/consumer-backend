import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import tab from './tab'
import consumer from './consumer'
import recharge from './recharge'
import user from './user'

Vue.use(Vuex)

// 创建Vuex实例
export default new Vuex.Store({
    modules: {
        tab,
        consumer,
        recharge,
        user
    },
    plugins: [createPersistedState({
        paths: ['tab.menuData', 'tab.tabList']
    })]   // 默认存储到Local Storage里
})
